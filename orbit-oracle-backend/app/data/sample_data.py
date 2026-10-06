MISSION_LOGS = [
    {"id": "LOG-2291", "time": "2026-10-04T14:31:00Z", "subsystem": "EPS",
     "title": "Array current below threshold",
     "text": "14:31 UTC: Solar array current dropped below threshold on panel string B. Value: 2.1A, nominal: 3.5A. Possible shadowing or orientation issue."},
    {"id": "LOG-2292", "time": "2026-10-04T14:32:00Z", "subsystem": "EPS",
     "title": "Bus undervoltage event",
     "text": "14:32 UTC: BUS_V fell from 28.1V to 26.4V. Load shed flag not set. Battery state of charge: 82%."},
    {"id": "LOG-2293", "time": "2026-10-04T14:35:00Z", "subsystem": "EPS",
     "title": "BUS-LOW alert raised",
     "text": "14:35 UTC: BUS-LOW alert raised to operator console. Threshold: 27.5V. Current value: 26.4V."},
    {"id": "LOG-2203", "time": "2026-10-04T09:05:00Z", "subsystem": "Thermal",
     "title": "Heater H2 on cycle extended",
     "text": "09:05 UTC: Heater H2 on cycle ran for 41 minutes, exceeding the usual 18 minutes. Battery pack B temperature rising."},
    {"id": "LOG-2204", "time": "2026-10-04T09:12:00Z", "subsystem": "Thermal",
     "title": "Battery pack B temperature high",
     "text": "09:12 UTC: Battery pack B temperature reached 31.8 C, which is 4.1 C above the 7-day average of 27.7 C."},
    {"id": "LOG-2101", "time": "2026-10-04T03:48:00Z", "subsystem": "ADCS",
     "title": "Star tracker 1 lost lock",
     "text": "03:48 UTC: Star tracker 1 lost lock for 6 seconds. Attitude error rose to 0.4 degrees. Tracker 2 maintained lock. System recovered automatically at 03:49 UTC."},
]

TELEMETRY = [
    {"id": "T-17", "time": "2026-10-04T14:30:00Z", "subsystem": "EPS",
     "title": "Bus voltage summary",
     "text": "Bus voltage summary 14:28-14:50 UTC. Min: 26.4V at 14:32. Max: 28.2V at 14:28. Nominal range: 27.5-28.5V. Values below nominal from 14:31 to 14:39 UTC."},
    {"id": "T-22", "time": "2026-10-04T09:00:00Z", "subsystem": "Thermal",
     "title": "Battery pack B temperature",
     "text": "Battery pack B temperature 09:00-09:50 UTC. Min: 27.4C. Max: 31.8C at 09:20. 7-day average: 27.7C. Elevated above average from 09:05 to 09:46 UTC."},
    {"id": "T-31", "time": "2026-10-04T03:48:00Z", "subsystem": "ADCS",
     "title": "Star tracker lock status",
     "text": "Star tracker status 03:45-03:55 UTC. Tracker 1 lost lock for 6 seconds at 03:48. Attitude error peak 0.4 degrees. Tracker 2 nominal throughout. Lock restored 03:49."},
    {"id": "T-18", "time": "2026-10-04T14:50:00Z", "subsystem": "EPS",
     "title": "Bus voltage post-recovery",
     "text": "Bus voltage 14:50-15:10 UTC. Returned to 27.9V after array re-pointing at 14:48. Nominal range maintained."},
]

PROCEDURES = [
    {"id": "EPS-07", "time": "2024-08-12T00:00:00Z", "subsystem": "EPS",
     "title": "Bus undervoltage response procedure",
     "text": "EPS-07 Low bus voltage procedure. Step 1: Confirm battery state of charge. Step 2: Check solar array pointing angle and sun sensor reading. Step 3: Compare array current with expected value for current sun angle. Step 4: If array is at fault, command re-pointing via ADCS. Step 5: If voltage below 26V, shed non-critical loads in order: science instruments, heaters, downlink. Step 6: Log all actions with timestamps."},
    {"id": "TH-03", "time": "2024-08-12T00:00:00Z", "subsystem": "Thermal",
     "title": "Thermal excursion response procedure",
     "text": "TH-03 Thermal excursion procedure. Step 1: Confirm which heater is showing extended on-time. Step 2: Compare heater duty cycle with expected based on current sun angle and orbital phase. Step 3: Check thermostat setpoint in the configuration table. Step 4: If setpoint has drifted, reset to nominal value per the configuration baseline. Step 5: Monitor temperature for 30 minutes after correction."},
    {"id": "ADCS-02", "time": "2024-08-12T00:00:00Z", "subsystem": "ADCS",
     "title": "Star tracker loss of lock procedure",
     "text": "ADCS-02 Star tracker loss of lock. Step 1: Check if Sun or Moon is within 20 degrees of the tracker field of view. Step 2: Review tracker 2 status as backup. Step 3: If attitude error exceeds 1 degree, switch to gyro-only mode. Step 4: Log the event with exact UTC time and duration. Step 5: If lock is not regained within 5 minutes, contact mission operations."},
    {"id": "MAN-COMMS-02", "time": "2024-08-12T00:00:00Z", "subsystem": "Comms",
     "title": "Downlink margin guide",
     "text": "Downlink margin guide. A margin below 3 dB should trigger an immediate check of antenna pointing and transmitter power output. Steps: 1 Verify antenna pointing against predicted values. 2 Check transmitter power telemetry. 3 Compare with link budget for current geometry. 4 If margin is below 2 dB, reduce data rate to the next lower rate class."},
]

INCIDENTS = [
    {"id": "INC-2024-09", "time": "2024-09-15T00:00:00Z", "subsystem": "EPS",
     "title": "Battery bus dip during eclipse exit",
     "text": "Incident INC-2024-09: Bus voltage dipped to 26.2V during eclipse exit. Root cause: solar array current dropped first due to panel mis-pointing after a manoeuvre. The bus voltage followed one minute later. Resolution: array re-pointing command restored current and voltage within 15 minutes. Similarity to ANM-014: same sequence of array current first, then bus voltage."},
    {"id": "INC-2023-14", "time": "2023-11-20T00:00:00Z", "subsystem": "Thermal",
     "title": "Heater stuck on after software patch",
     "text": "Incident INC-2023-14: Heater H2 thermostat setpoint drifted after a software patch loaded new configuration table. Heater ran continuously for 3 hours, raising battery pack B to 34.5C. Resolution: thermostat setpoint reset to nominal value from the baseline configuration. Recommendation: verify thermal configuration table after every software patch."},
]