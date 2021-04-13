// tslint:disable: no-unsafe-any
import { StoreSync as AbstractStore } from "@konceiver/kv-file";
import { ensureFileSync, readFileSync, writeFileSync } from "fs-extra";
import xml from "xml-js";

export class StoreSync<K, T> extends AbstractStore<K, T> {
	public static new<K, T>(uri: string): StoreSync<K, T> {
		return new StoreSync<K, T>(new Map<K, T>(), uri);
	}

	protected dump(): void {
		writeFileSync(
			this.uri,
			xml.js2xml(this.all(), { compact: true, spaces: 4 })
		);
	}

	protected load(): void {
		ensureFileSync(this.uri);

		try {
			const entries: xml.Element | xml.ElementCompact = xml.xml2js(
				readFileSync(this.uri, "utf8")
			);

			if (entries.elements) {
				for (const entry of entries.elements) {
					this.put(entry.name, entry.elements[0].text);
				}
			}
		} catch {
			//
		}
	}
}
