MISSION_LOGS = [

    # =========================
    # EPS - ELECTRICAL POWER
    # =========================

    {
        "id": "LOG-2291",
        "time": "2026-10-04T14:31:00Z",
        "subsystem": "EPS",
        "title": "Array current below threshold",
        "text": "14:31 UTC: Solar array current dropped below threshold on panel string B. Value: 2.1A, nominal: 3.5A. Possible shadowing or orientation issue."
    },
    {
        "id": "LOG-2292",
        "time": "2026-10-04T14:32:00Z",
        "subsystem": "EPS",
        "title": "Bus undervoltage event",
        "text": "14:32 UTC: BUS_V fell from 28.1V to 26.4V. Load shed flag not set. Battery state of charge: 82%."
    },
    {
        "id": "LOG-2293",
        "time": "2026-10-04T14:35:00Z",
        "subsystem": "EPS",
        "title": "BUS-LOW alert raised",
        "text": "14:35 UTC: BUS-LOW alert raised to operator console. Threshold: 27.5V. Current value: 26.4V."
    },
    {
        "id": "LOG-2294",
        "time": "2026-10-04T14:39:00Z",
        "subsystem": "EPS",
        "title": "Solar array current recovery",
        "text": "14:39 UTC: Solar array string B current increased from 2.1A to 3.2A following improved spacecraft orientation."
    },
    {
        "id": "LOG-2295",
        "time": "2026-10-04T14:48:00Z",
        "subsystem": "EPS",
        "title": "Array re-pointing completed",
        "text": "14:48 UTC: ADCS completed solar array re-pointing command. Array current returned to nominal range."
    },
    {
        "id": "LOG-2296",
        "time": "2026-10-04T14:51:00Z",
        "subsystem": "EPS",
        "title": "Bus voltage restored",
        "text": "14:51 UTC: BUS_V recovered to 27.9V following array re-pointing. Battery state of charge stable at 81%."
    },
    {
        "id": "LOG-2180",
        "time": "2026-10-03T17:21:00Z",
        "subsystem": "EPS",
        "title": "Battery discharge rate elevated",
        "text": "17:21 UTC: Battery discharge current reached 4.8A compared with expected maximum of 3.9A during eclipse operations."
    },
    {
        "id": "LOG-2181",
        "time": "2026-10-03T17:25:00Z",
        "subsystem": "EPS",
        "title": "Battery state of charge declining",
        "text": "17:25 UTC: Battery state of charge decreased from 76% to 71% over twelve minutes. No load shed condition detected."
    },
    {
        "id": "LOG-2182",
        "time": "2026-10-03T17:42:00Z",
        "subsystem": "EPS",
        "title": "Battery charging resumed",
        "text": "17:42 UTC: Battery charging current returned to positive values following eclipse exit. State of charge recovered to 73%."
    },
    {
        "id": "LOG-2140",
        "time": "2026-10-02T08:14:00Z",
        "subsystem": "EPS",
        "title": "Power distribution channel warning",
        "text": "08:14 UTC: PDU channel 4 reported intermittent current fluctuations between 0.7A and 1.4A. Nominal current is 1.0A."
    },

    # =========================
    # THERMAL
    # =========================

    {
        "id": "LOG-2203",
        "time": "2026-10-04T09:05:00Z",
        "subsystem": "Thermal",
        "title": "Heater H2 on cycle extended",
        "text": "09:05 UTC: Heater H2 on cycle ran for 41 minutes, exceeding the usual 18 minutes. Battery pack B temperature rising."
    },
    {
        "id": "LOG-2204",
        "time": "2026-10-04T09:12:00Z",
        "subsystem": "Thermal",
        "title": "Battery pack B temperature high",
        "text": "09:12 UTC: Battery pack B temperature reached 31.8 C, which is 4.1 C above the 7-day average of 27.7 C."
    },
    {
        "id": "LOG-2205",
        "time": "2026-10-04T09:20:00Z",
        "subsystem": "Thermal",
        "title": "Thermal trend increasing",
        "text": "09:20 UTC: Battery pack B temperature continued increasing at approximately 0.3 C per minute. Heater H2 remained active."
    },
    {
        "id": "LOG-2206",
        "time": "2026-10-04T09:31:00Z",
        "subsystem": "Thermal",
        "title": "Heater duty cycle abnormal",
        "text": "09:31 UTC: Heater H2 duty cycle reached 82%. Expected duty cycle for current orbital phase is approximately 35%."
    },
    {
        "id": "LOG-2207",
        "time": "2026-10-04T09:45:00Z",
        "subsystem": "Thermal",
        "title": "Thermal excursion stabilizing",
        "text": "09:45 UTC: Battery pack B temperature stabilized at 32.1 C after heater H2 was commanded to standby."
    },
    {
        "id": "LOG-2162",
        "time": "2026-10-03T05:44:00Z",
        "subsystem": "Thermal",
        "title": "Payload electronics temperature low",
        "text": "05:44 UTC: Payload electronics temperature dropped to 6.8 C. Minimum operational temperature is 8 C."
    },
    {
        "id": "LOG-2163",
        "time": "2026-10-03T05:51:00Z",
        "subsystem": "Thermal",
        "title": "Payload heater activated",
        "text": "05:51 UTC: Payload heater PH-1 activated automatically after electronics temperature crossed the low-temperature threshold."
    },
    {
        "id": "LOG-2164",
        "time": "2026-10-03T06:12:00Z",
        "subsystem": "Thermal",
        "title": "Payload temperature returned nominal",
        "text": "06:12 UTC: Payload electronics temperature recovered to 10.4 C. Heater PH-1 returned to normal duty cycle."
    },

    # =========================
    # ADCS
    # =========================

    {
        "id": "LOG-2101",
        "time": "2026-10-04T03:48:00Z",
        "subsystem": "ADCS",
        "title": "Star tracker 1 lost lock",
        "text": "03:48 UTC: Star tracker 1 lost lock for 6 seconds. Attitude error rose to 0.4 degrees. Tracker 2 maintained lock. System recovered automatically at 03:49 UTC."
    },
    {
        "id": "LOG-2102",
        "time": "2026-10-04T03:50:00Z",
        "subsystem": "ADCS",
        "title": "Attitude control recovered",
        "text": "03:50 UTC: Attitude solution returned to nominal following automatic star tracker reacquisition. Final attitude error measured at 0.08 degrees."
    },
    {
        "id": "LOG-2103",
        "time": "2026-10-03T22:15:00Z",
        "subsystem": "ADCS",
        "title": "Reaction wheel speed elevated",
        "text": "22:15 UTC: Reaction wheel RW-3 speed reached 5100 RPM, exceeding normal operating range of 1000-4500 RPM."
    },
    {
        "id": "LOG-2104",
        "time": "2026-10-03T22:19:00Z",
        "subsystem": "ADCS",
        "title": "Reaction wheel momentum unloading initiated",
        "text": "22:19 UTC: Momentum unloading initiated using magnetic torquer control. RW-3 speed decreased to 4300 RPM."
    },
    {
        "id": "LOG-2105",
        "time": "2026-10-03T22:31:00Z",
        "subsystem": "ADCS",
        "title": "Momentum unloading completed",
        "text": "22:31 UTC: Reaction wheel momentum unloading completed successfully. All wheel speeds within nominal range."
    },
    {
        "id": "LOG-2077",
        "time": "2026-10-02T13:22:00Z",
        "subsystem": "ADCS",
        "title": "Sun sensor disagreement",
        "text": "13:22 UTC: Sun sensor A and Sun sensor B reported solar vector disagreement of 2.7 degrees. Sensor A reported intermittent readings."
    },
    {
        "id": "LOG-2078",
        "time": "2026-10-02T13:34:00Z",
        "subsystem": "ADCS",
        "title": "Sun sensor readings normalized",
        "text": "13:34 UTC: Sun sensor A readings returned within expected tolerance. No persistent attitude error observed."
    },

    # =========================
    # COMMUNICATIONS
    # =========================

    {
        "id": "LOG-2001",
        "time": "2026-10-04T16:10:00Z",
        "subsystem": "Comms",
        "title": "Downlink margin below threshold",
        "text": "16:10 UTC: X-band downlink margin measured at 2.7 dB. Operational threshold is 3.0 dB."
    },
    {
        "id": "LOG-2002",
        "time": "2026-10-04T16:12:00Z",
        "subsystem": "Comms",
        "title": "Antenna pointing deviation detected",
        "text": "16:12 UTC: Antenna pointing error reached 0.8 degrees. Predicted pointing error is less than 0.3 degrees."
    },
    {
        "id": "LOG-2003",
        "time": "2026-10-04T16:17:00Z",
        "subsystem": "Comms",
        "title": "Antenna pointing correction",
        "text": "16:17 UTC: ADCS corrected spacecraft attitude by 0.5 degrees to improve antenna pointing."
    },
    {
        "id": "LOG-2004",
        "time": "2026-10-04T16:25:00Z",
        "subsystem": "Comms",
        "title": "Downlink margin recovered",
        "text": "16:25 UTC: X-band downlink margin increased to 4.1 dB following antenna pointing correction."
    },
    {
        "id": "LOG-1990",
        "time": "2026-10-03T11:03:00Z",
        "subsystem": "Comms",
        "title": "Packet loss detected",
        "text": "11:03 UTC: Telemetry packet loss increased to 2.4% during ground station pass. Expected packet loss is below 0.5%."
    },
    {
        "id": "LOG-1991",
        "time": "2026-10-03T11:08:00Z",
        "subsystem": "Comms",
        "title": "Packet retransmission rate elevated",
        "text": "11:08 UTC: Automatic retransmission rate increased due to degraded link quality. No command loss detected."
    },
    {
        "id": "LOG-1992",
        "time": "2026-10-03T11:21:00Z",
        "subsystem": "Comms",
        "title": "Communications link restored",
        "text": "11:21 UTC: Packet loss returned to 0.3%. Downlink link quality returned to nominal range."
    },

    # =========================
    # PROPULSION
    # =========================

    {
        "id": "LOG-1901",
        "time": "2026-10-04T01:10:00Z",
        "subsystem": "Propulsion",
        "title": "Propellant pressure fluctuation",
        "text": "01:10 UTC: Propellant tank pressure decreased from 18.4 bar to 17.8 bar over 90 seconds. Expected pressure variation is below 0.3 bar."
    },
    {
        "id": "LOG-1902",
        "time": "2026-10-04T01:14:00Z",
        "subsystem": "Propulsion",
        "title": "Pressure sensor cross-check",
        "text": "01:14 UTC: Primary pressure sensor reading compared against redundant sensor. Difference measured at 0.08 bar."
    },
    {
        "id": "LOG-1903",
        "time": "2026-10-04T01:22:00Z",
        "subsystem": "Propulsion",
        "title": "Propellant pressure stabilized",
        "text": "01:22 UTC: Propellant tank pressure stabilized at 17.9 bar. No leak indication detected."
    },
    {
        "id": "LOG-1880",
        "time": "2026-10-02T19:42:00Z",
        "subsystem": "Propulsion",
        "title": "Thruster valve response delayed",
        "text": "19:42 UTC: Thruster valve TV-2 response time measured at 420 ms compared with nominal 250 ms."
    },
    {
        "id": "LOG-1881",
        "time": "2026-10-02T19:49:00Z",
        "subsystem": "Propulsion",
        "title": "Thruster valve diagnostic executed",
        "text": "19:49 UTC: Diagnostic pulse command sent to TV-2. Valve response improved to 280 ms."
    },

    # =========================
    # PAYLOAD
    # =========================

    {
        "id": "LOG-1801",
        "time": "2026-10-04T06:20:00Z",
        "subsystem": "Payload",
        "title": "Imaging payload exposure anomaly",
        "text": "06:20 UTC: Camera exposure time increased to 14.2 ms from nominal 10 ms. Image brightness exceeded expected range."
    },
    {
        "id": "LOG-1802",
        "time": "2026-10-04T06:24:00Z",
        "subsystem": "Payload",
        "title": "Payload image quality degraded",
        "text": "06:24 UTC: Image quality metric decreased by 11%. Optical payload temperature measured at 18.7 C."
    },
    {
        "id": "LOG-1803",
        "time": "2026-10-04T06:40:00Z",
        "subsystem": "Payload",
        "title": "Camera configuration restored",
        "text": "06:40 UTC: Camera exposure configuration restored to baseline value of 10 ms. Image quality returned to expected range."
    },
    {
        "id": "LOG-1750",
        "time": "2026-10-03T04:30:00Z",
        "subsystem": "Payload",
        "title": "Payload storage utilization high",
        "text": "04:30 UTC: Payload solid-state recorder reached 87% utilization. Scheduled downlink required to prevent storage saturation."
    },
    {
        "id": "LOG-1751",
        "time": "2026-10-03T10:40:00Z",
        "subsystem": "Payload",
        "title": "Payload storage partially cleared",
        "text": "10:40 UTC: 420 MB of payload data successfully downlinked. Storage utilization reduced to 69%."
    },

    # =========================
    # FLIGHT SOFTWARE
    # =========================

    {
        "id": "LOG-1701",
        "time": "2026-10-04T02:05:00Z",
        "subsystem": "Flight Software",
        "title": "Task execution delay detected",
        "text": "02:05 UTC: Navigation task execution exceeded its normal 50 ms cycle by 18 ms. CPU utilization reached 86%."
    },
    {
        "id": "LOG-1702",
        "time": "2026-10-04T02:09:00Z",
        "subsystem": "Flight Software",
        "title": "CPU utilization elevated",
        "text": "02:09 UTC: Flight computer CPU utilization reached 91% for approximately 45 seconds. No watchdog reset occurred."
    },
    {
        "id": "LOG-1703",
        "time": "2026-10-04T02:16:00Z",
        "subsystem": "Flight Software",
        "title": "CPU utilization normalized",
        "text": "02:16 UTC: CPU utilization returned to 58%. Navigation task timing returned within nominal limits."
    },
    {
        "id": "LOG-1690",
        "time": "2026-10-03T15:12:00Z",
        "subsystem": "Flight Software",
        "title": "Memory allocation warning",
        "text": "15:12 UTC: Flight software heap utilization reached 78%. Automatic memory cleanup executed successfully."
    },
    {
        "id": "LOG-1691",
        "time": "2026-10-03T15:18:00Z",
        "subsystem": "Flight Software",
        "title": "Memory utilization stabilized",
        "text": "15:18 UTC: Heap utilization reduced to 61% following garbage collection cycle. No task failures observed."
    },

    # =========================
    # GENERAL / OPERATIONS
    # =========================

    {
        "id": "LOG-1601",
        "time": "2026-10-04T12:00:00Z",
        "subsystem": "Operations",
        "title": "Routine health check completed",
        "text": "12:00 UTC: Routine spacecraft health check completed. EPS, Thermal, ADCS, Comms and Flight Software reported nominal status."
    },
    {
        "id": "LOG-1602",
        "time": "2026-10-03T12:00:00Z",
        "subsystem": "Operations",
        "title": "Daily telemetry review completed",
        "text": "12:00 UTC: Daily telemetry review completed. Three low-priority trends identified for monitoring: battery temperature, reaction wheel speed and downlink margin."
    },
    {
        "id": "LOG-1603",
        "time": "2026-10-02T12:00:00Z",
        "subsystem": "Operations",
        "title": "Ground station pass completed",
        "text": "12:00 UTC: Ground station pass completed successfully. Telemetry received with 99.4% packet integrity."
    },
    {
        "id": "LOG-1604",
        "time": "2026-10-01T18:30:00Z",
        "subsystem": "Operations",
        "title": "Scheduled spacecraft maintenance",
        "text": "18:30 UTC: Scheduled maintenance sequence completed. Configuration checks passed for EPS and ADCS."
    },
]

TELEMETRY = [

    # EPS
    {
        "id": "T-17",
        "time": "2026-10-04T14:30:00Z",
        "subsystem": "EPS",
        "title": "Bus voltage summary",
        "text": "Bus voltage summary 14:28-14:50 UTC. Min: 26.4V at 14:32. Max: 28.2V at 14:28. Nominal range: 27.5-28.5V. Values below nominal from 14:31 to 14:39 UTC."
    },
    {
        "id": "T-18",
        "time": "2026-10-04T14:50:00Z",
        "subsystem": "EPS",
        "title": "Bus voltage post-recovery",
        "text": "Bus voltage 14:50-15:10 UTC. Returned to 27.9V after array re-pointing at 14:48. Nominal range maintained."
    },
    {
        "id": "T-19",
        "time": "2026-10-04T14:20:00Z",
        "subsystem": "EPS",
        "title": "Solar array current",
        "text": "Solar array string B current 14:20-14:50 UTC. Nominal: 3.5A. Minimum: 2.1A at 14:31. Current recovered to 3.4A after spacecraft re-pointing."
    },
    {
        "id": "T-20",
        "time": "2026-10-03T17:00:00Z",
        "subsystem": "EPS",
        "title": "Battery discharge telemetry",
        "text": "Battery discharge telemetry 17:00-17:45 UTC. Peak discharge current 4.8A. State of charge decreased from 76% to 71% before eclipse exit."
    },
    {
        "id": "T-21",
        "time": "2026-10-03T17:40:00Z",
        "subsystem": "EPS",
        "title": "Battery charging telemetry",
        "text": "Battery charging telemetry after eclipse exit. Charging current reached 2.3A and state of charge recovered to 73%."
    },

    # Thermal
    {
        "id": "T-22",
        "time": "2026-10-04T09:00:00Z",
        "subsystem": "Thermal",
        "title": "Battery pack B temperature",
        "text": "Battery pack B temperature 09:00-09:50 UTC. Min: 27.4C. Max: 31.8C at 09:20. 7-day average: 27.7C. Elevated above average from 09:05 to 09:46 UTC."
    },
    {
        "id": "T-23",
        "time": "2026-10-04T09:30:00Z",
        "subsystem": "Thermal",
        "title": "Heater H2 duty cycle",
        "text": "Heater H2 duty cycle 09:00-09:45 UTC. Normal expected duty cycle: 35%. Measured peak: 82%. Heater commanded standby at 09:43 UTC."
    },
    {
        "id": "T-24",
        "time": "2026-10-03T05:40:00Z",
        "subsystem": "Thermal",
        "title": "Payload temperature",
        "text": "Payload electronics temperature 05:40-06:20 UTC. Minimum: 6.8C. Heater PH-1 activated at 05:51 UTC. Temperature recovered to 10.4C."
    },
    {
        "id": "T-25",
        "time": "2026-10-02T08:00:00Z",
        "subsystem": "Thermal",
        "title": "Avionics temperature",
        "text": "Avionics bay temperature remained between 19.4C and 22.1C during the observation window. Nominal operating range is 15-30C."
    },

    # ADCS
    {
        "id": "T-31",
        "time": "2026-10-04T03:48:00Z",
        "subsystem": "ADCS",
        "title": "Star tracker lock status",
        "text": "Star tracker status 03:45-03:55 UTC. Tracker 1 lost lock for 6 seconds at 03:48. Attitude error peak 0.4 degrees. Tracker 2 nominal throughout. Lock restored 03:49."
    },
    {
        "id": "T-32",
        "time": "2026-10-03T22:10:00Z",
        "subsystem": "ADCS",
        "title": "Reaction wheel speeds",
        "text": "Reaction wheel telemetry 22:10-22:35 UTC. RW-3 peaked at 5100 RPM. Momentum unloading reduced RW-3 speed to 4300 RPM."
    },
    {
        "id": "T-33",
        "time": "2026-10-02T13:20:00Z",
        "subsystem": "ADCS",
        "title": "Sun sensor comparison",
        "text": "Sun sensor comparison showed a temporary 2.7 degree disagreement between sensors A and B. Sensor A returned to nominal after 12 minutes."
    },
    {
        "id": "T-34",
        "time": "2026-10-01T07:15:00Z",
        "subsystem": "ADCS",
        "title": "Attitude stability",
        "text": "Attitude error remained below 0.12 degrees for the full observation period. All control actuators operated within nominal limits."
    },

    # Communications
    {
        "id": "T-40",
        "time": "2026-10-04T16:10:00Z",
        "subsystem": "Comms",
        "title": "Downlink margin",
        "text": "X-band downlink margin decreased to 2.7 dB at 16:10 UTC. Margin recovered to 4.1 dB after antenna pointing correction."
    },
    {
        "id": "T-41",
        "time": "2026-10-03T11:00:00Z",
        "subsystem": "Comms",
        "title": "Packet loss telemetry",
        "text": "Packet loss during ground station pass increased to 2.4%. Expected value is below 0.5%. Loss returned to 0.3% by 11:21 UTC."
    },
    {
        "id": "T-42",
        "time": "2026-10-02T16:30:00Z",
        "subsystem": "Comms",
        "title": "Transmitter power",
        "text": "X-band transmitter output remained at 18.2W, within nominal range of 17-20W."
    },

    # Propulsion
    {
        "id": "T-50",
        "time": "2026-10-04T01:00:00Z",
        "subsystem": "Propulsion",
        "title": "Propellant pressure",
        "text": "Propellant pressure decreased from 18.4 bar to 17.8 bar before stabilizing at 17.9 bar. Redundant sensor agreement remained within 0.08 bar."
    },
    {
        "id": "T-51",
        "time": "2026-10-02T19:40:00Z",
        "subsystem": "Propulsion",
        "title": "Thruster valve response",
        "text": "Thruster valve TV-2 response time initially measured 420 ms. Diagnostic pulse reduced response time to 280 ms."
    },
    {
        "id": "T-52",
        "time": "2026-10-01T21:15:00Z",
        "subsystem": "Propulsion",
        "title": "Propellant quantity estimate",
        "text": "Estimated propellant quantity: 64.2%. No rapid depletion trend observed. Tank temperature remained within nominal limits."
    },

    # Payload
    {
        "id": "T-60",
        "time": "2026-10-04T06:20:00Z",
        "subsystem": "Payload",
        "title": "Camera exposure telemetry",
        "text": "Camera exposure increased from nominal 10 ms to 14.2 ms. Image brightness increased above expected level."
    },
    {
        "id": "T-61",
        "time": "2026-10-04T06:30:00Z",
        "subsystem": "Payload",
        "title": "Image quality metric",
        "text": "Image quality metric decreased by 11% during the exposure anomaly. Metric returned to baseline after camera configuration restoration."
    },
    {
        "id": "T-62",
        "time": "2026-10-03T04:30:00Z",
        "subsystem": "Payload",
        "title": "Payload storage",
        "text": "Payload storage reached 87% utilization. Following downlink of 420 MB, utilization decreased to 69%."
    },

    # Flight Software
    {
        "id": "T-70",
        "time": "2026-10-04T02:00:00Z",
        "subsystem": "Flight Software",
        "title": "CPU utilization",
        "text": "Flight computer CPU utilization peaked at 91% for approximately 45 seconds. No watchdog reset or task failure occurred."
    },
    {
        "id": "T-71",
        "time": "2026-10-03T15:10:00Z",
        "subsystem": "Flight Software",
        "title": "Heap utilization",
        "text": "Flight software heap utilization reached 78%. Garbage collection reduced heap utilization to 61%."
    },
    {
        "id": "T-72",
        "time": "2026-10-02T11:40:00Z",
        "subsystem": "Flight Software",
        "title": "Navigation task timing",
        "text": "Navigation task execution remained within 50 ms cycle requirement for 99.7% of observed cycles."
    },

    # Operations
    {
        "id": "T-80",
        "time": "2026-10-04T12:00:00Z",
        "subsystem": "Operations",
        "title": "Spacecraft health summary",
        "text": "Overall spacecraft health assessment: EPS nominal after recovery, Thermal requires monitoring, ADCS nominal, Communications nominal, Payload nominal, Flight Software nominal."
    },
    {
        "id": "T-81",
        "time": "2026-10-03T12:00:00Z",
        "subsystem": "Operations",
        "title": "Daily anomaly summary",
        "text": "Daily anomaly review identified elevated battery temperature, elevated reaction wheel speed and reduced communications margin as trends requiring monitoring."
    },
]


INCIDENTS = [

    {
        "id": "INC-2024-09",
        "time": "2024-09-15T00:00:00Z",
        "subsystem": "EPS",
        "title": "Battery bus dip during eclipse exit",
        "text": "Incident INC-2024-09: Bus voltage dipped to 26.2V during eclipse exit. Root cause: solar array current dropped first due to panel mis-pointing after a manoeuvre. The bus voltage followed one minute later. Resolution: array re-pointing command restored current and voltage within 15 minutes. Similarity to recent EPS events: same sequence of array current reduction followed by bus voltage reduction."
    },
    {
        "id": "INC-2024-11",
        "time": "2024-10-08T00:00:00Z",
        "subsystem": "EPS",
        "title": "PDU channel intermittent current",
        "text": "Incident INC-2024-11: PDU channel 4 showed intermittent current fluctuations. Root cause was traced to an unstable connected load. Resolution: affected load was isolated and channel telemetry returned to nominal."
    },
    {
        "id": "INC-2023-22",
        "time": "2023-12-14T00:00:00Z",
        "subsystem": "EPS",
        "title": "Battery state of charge decline",
        "text": "Incident INC-2023-22: Battery state of charge declined faster than predicted during eclipse. Root cause was simultaneous operation of two non-critical payload loads. Resolution: load scheduling was modified to prevent simultaneous operation during long eclipse periods."
    },

    {
        "id": "INC-2023-14",
        "time": "2023-11-20T00:00:00Z",
        "subsystem": "Thermal",
        "title": "Heater stuck on after software patch",
        "text": "Incident INC-2023-14: Heater H2 thermostat setpoint drifted after a software patch loaded new configuration table. Heater ran continuously for 3 hours, raising battery pack B to 34.5C. Resolution: thermostat setpoint reset to nominal value from the baseline configuration. Recommendation: verify thermal configuration table after every software patch."
    },
    {
        "id": "INC-2024-03",
        "time": "2024-03-11T00:00:00Z",
        "subsystem": "Thermal",
        "title": "Payload electronics cold excursion",
        "text": "Incident INC-2024-03: Payload electronics temperature fell below minimum operating temperature during eclipse. Root cause was delayed heater activation caused by an incorrect threshold configuration. Resolution: threshold restored to baseline."
    },
    {
        "id": "INC-2022-18",
        "time": "2022-08-21T00:00:00Z",
        "subsystem": "Thermal",
        "title": "Battery temperature increase",
        "text": "Incident INC-2022-18: Battery pack temperature increased by 6C over baseline. Investigation found extended heater duty cycle caused by an incorrect thermostat configuration. Configuration was restored and thermal performance normalized."
    },

    {
        "id": "INC-2024-01",
        "time": "2024-01-19T00:00:00Z",
        "subsystem": "ADCS",
        "title": "Star tracker loss of lock",
        "text": "Incident INC-2024-01: Star tracker 1 temporarily lost lock for 12 seconds while the spacecraft passed through a bright-field condition. Tracker 2 maintained attitude solution. No operational impact occurred."
    },
    {
        "id": "INC-2023-31",
        "time": "2023-10-03T00:00:00Z",
        "subsystem": "ADCS",
        "title": "Reaction wheel momentum buildup",
        "text": "Incident INC-2023-31: Reaction wheel 3 exceeded 5000 RPM due to accumulated spacecraft momentum. Magnetic torquer unloading reduced wheel speed to nominal range."
    },
    {
        "id": "INC-2022-27",
        "time": "2022-09-16T00:00:00Z",
        "subsystem": "ADCS",
        "title": "Sun sensor disagreement",
        "text": "Incident INC-2022-27: Sun sensor A and B disagreement reached 3.1 degrees. Sensor A was found to have intermittent output noise. Sensor B remained reliable and was used as the primary reference."
    },

    {
        "id": "INC-2024-06",
        "time": "2024-06-10T00:00:00Z",
        "subsystem": "Comms",
        "title": "Low downlink margin",
        "text": "Incident INC-2024-06: Downlink margin fell below 3 dB during a ground station pass. Root cause was antenna pointing error caused by an attitude reference offset. Correcting attitude restored link margin."
    },
    {
        "id": "INC-2023-17",
        "time": "2023-07-14T00:00:00Z",
        "subsystem": "Comms",
        "title": "High packet loss during pass",
        "text": "Incident INC-2023-17: Packet loss reached 4.2% during ground station contact. Antenna pointing error and low elevation angle contributed to reduced link quality. No command packets were lost."
    },
    {
        "id": "INC-2022-11",
        "time": "2022-05-19T00:00:00Z",
        "subsystem": "Comms",
        "title": "Transmitter power reduction",
        "text": "Incident INC-2022-11: X-band transmitter output dropped below nominal. Redundant power telemetry confirmed the decrease. Transmitter was power-cycled and output returned to nominal."
    },

    {
        "id": "INC-2024-13",
        "time": "2024-12-02T00:00:00Z",
        "subsystem": "Propulsion",
        "title": "Propellant pressure transient",
        "text": "Incident INC-2024-13: Propellant pressure decreased by 0.7 bar during thermal transition. Redundant sensor confirmed the change. Pressure stabilized without intervention and no leak was detected."
    },
    {
        "id": "INC-2023-08",
        "time": "2023-04-22T00:00:00Z",
        "subsystem": "Propulsion",
        "title": "Thruster valve delayed response",
        "text": "Incident INC-2023-08: Thruster valve response exceeded nominal timing. Diagnostic pulses improved valve response. Valve remained operational with increased monitoring."
    },

    {
        "id": "INC-2024-15",
        "time": "2024-11-08T00:00:00Z",
        "subsystem": "Payload",
        "title": "Camera exposure configuration error",
        "text": "Incident INC-2024-15: Imaging payload exposure time was changed to an incorrect value after a configuration update. Image brightness increased significantly. Restoring the approved baseline configuration resolved the issue."
    },
    {
        "id": "INC-2023-25",
        "time": "2023-09-11T00:00:00Z",
        "subsystem": "Payload",
        "title": "Payload recorder saturation",
        "text": "Incident INC-2023-25: Payload recorder utilization exceeded 92%. Several high-volume observation sessions were scheduled without sufficient downlink capacity. Additional downlink passes were scheduled and storage returned below 70%."
    },

    {
        "id": "INC-2024-18",
        "time": "2024-12-21T00:00:00Z",
        "subsystem": "Flight Software",
        "title": "High CPU utilization event",
        "text": "Incident INC-2024-18: Flight computer CPU utilization exceeded 90% during simultaneous navigation and payload processing. Task scheduling was adjusted to prevent recurrence."
    },
    {
        "id": "INC-2023-19",
        "time": "2023-08-29T00:00:00Z",
        "subsystem": "Flight Software",
        "title": "Memory utilization warning",
        "text": "Incident INC-2023-19: Heap utilization reached 88% due to an unreleased telemetry buffer. Memory cleanup restored utilization to 62%. Software patch was later deployed to correct buffer handling."
    },
]