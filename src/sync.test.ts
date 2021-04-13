import { complianceTestsSync } from "@konceiver/kv-test-suite";
import { tmpdir } from "os";

import { StoreSync } from "./sync";

complianceTestsSync(
	() => StoreSync.new<string, string>(`${tmpdir()}/kkv.xml`),
	{
		key1: "value1",
		key2: "value2",
		key3: "value3",
		key4: "value4",
		key5: "value5",
	}
);
