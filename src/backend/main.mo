import Time "mo:core/Time";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type SmartwatchRecord = {
    timestamp : Time.Time;
    steps : ?Nat;
    heartRate : ?Nat;
    calories : ?Float;
    distance : ?Float;
    sleep : ?Nat;
  };

  type SmartwatchDataset = {
    name : Text;
    uploadTime : Time.Time;
    originalFormat : Text;
    records : [SmartwatchRecord];
  };

  let userDatasets = Map.empty<Principal, List.List<SmartwatchDataset>>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func addSmartwatchDataset(dataset : SmartwatchDataset) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add datasets");
    };

    let existingDatasets = switch (userDatasets.get(caller)) {
      case (null) { List.empty<SmartwatchDataset>() };
      case (?datasets) { datasets };
    };

    existingDatasets.add(dataset);
    userDatasets.add(caller, existingDatasets);
  };

  public query ({ caller }) func getMyDatasets() : async [SmartwatchDataset] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access datasets");
    };

    switch (userDatasets.get(caller)) {
      case (null) { [] };
      case (?datasets) { datasets.toArray() };
    };
  };

  public query ({ caller }) func getAllUserDatasets() : async [SmartwatchDataset] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access all user datasets");
    };

    let allDatasets = List.empty<SmartwatchDataset>();

    for ((_, datasets) in userDatasets.entries()) {
      for (dataset in datasets.values()) {
        allDatasets.add(dataset);
      };
    };
    allDatasets.toArray();
  };

  public query ({ caller }) func getUserDatasets(user : Principal) : async [SmartwatchDataset] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own datasets");
    };

    switch (userDatasets.get(user)) {
      case (null) { [] };
      case (?datasets) { datasets.toArray() };
    };
  };

  public query ({ caller }) func filterDatasetsByMetric(
    metric : Text,
    minValue : ?Float,
    maxValue : ?Float,
  ) : async [SmartwatchDataset] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can filter datasets");
    };

    let allDatasets = List.empty<SmartwatchDataset>();

    switch (userDatasets.get(caller)) {
      case (null) { return []; };
      case (?datasets) {
        for (dataset in datasets.values()) {
          let filteredRecords = if (metric == "steps") {
            dataset.records.filter(
              func(record) {
                switch (record.steps) {
                  case (null) { false };
                  case (?steps) {
                    let stepsFloat = steps.toInt().toFloat();
                    let minCheck = switch (minValue) {
                      case (null) { true };
                      case (?min) { stepsFloat >= min };
                    };
                    let maxCheck = switch (maxValue) {
                      case (null) { true };
                      case (?max) { stepsFloat <= max };
                    };
                    minCheck and maxCheck;
                  };
                };
              }
            );
          } else if (metric == "heartRate") {
            dataset.records.filter(
              func(record) {
                switch (record.heartRate) {
                  case (null) { false };
                  case (?heartRate) {
                    let heartRateFloat = heartRate.toInt().toFloat();
                    let minCheck = switch (minValue) {
                      case (null) { true };
                      case (?min) { heartRateFloat >= min };
                    };
                    let maxCheck = switch (maxValue) {
                      case (null) { true };
                      case (?max) { heartRateFloat <= max };
                    };
                    minCheck and maxCheck;
                  };
                };
              }
            );
          } else if (metric == "calories") {
            dataset.records.filter(
              func(record) {
                switch (record.calories) {
                  case (null) { false };
                  case (?calories) {
                    let minCheck = switch (minValue) {
                      case (null) { true };
                      case (?min) { calories >= min };
                    };
                    let maxCheck = switch (maxValue) {
                      case (null) { true };
                      case (?max) { calories <= max };
                    };
                    minCheck and maxCheck;
                  };
                };
              }
            );
          } else if (metric == "distance") {
            dataset.records.filter(
              func(record) {
                switch (record.distance) {
                  case (null) { false };
                  case (?distance) {
                    let minCheck = switch (minValue) {
                      case (null) { true };
                      case (?min) { distance >= min };
                    };
                    let maxCheck = switch (maxValue) {
                      case (null) { true };
                      case (?max) { distance <= max };
                    };
                    minCheck and maxCheck;
                  };
                };
              }
            );
          } else {
            dataset.records;
          };

          if (filteredRecords.size() > 0) {
            allDatasets.add(
              { dataset with records = filteredRecords },
            );
          };
        };
      };
    };
    allDatasets.toArray();
  };
};
