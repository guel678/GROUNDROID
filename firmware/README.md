# Future ESP32 integration

No firmware or physical rover transport is implemented. The current UI uses a deterministic simulator and never reports commands as delivered to hardware.

A future adapter must add authenticated command envelopes, sequence numbers, acknowledgements, telemetry timeouts, capability discovery, and an independently verified physical emergency-stop mechanism. The web emergency-stop button must never be treated as that mechanism.
