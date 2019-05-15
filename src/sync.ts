// tslint:disable: no-unsafe-any
import { StoreSync as AbstractStore } from "@keeveestore/file";
import { readFileSync, writeFileSync } from "fs";
import { ensureFileSync } from "fs-extra";
import xml from "xml-js";

export class StoreSync<K, T> extends AbstractStore<K, T> {
	public static new<K, T>(uri: string): StoreSync<K, T> {
		return new StoreSync<K, T>(new Map<K, T>(), uri);
	}

	protected dump(): void {
		// @ts-ignore
		const rows: Record<K, T> = {};

		for (const [key, value] of this.all()) {
			rows[key] = value;
		}

		writeFileSync(this.uri, xml.js2xml(rows, { compact: true, spaces: 4 }));
	}

	protected load(): void {
		ensureFileSync(this.uri);

		const entries: xml.Element | xml.ElementCompact = xml.xml2js(readFileSync(this.uri, "utf8"));

		if (entries.elements) {
			for (const entry of entries.elements) {
				this.put(entry.name, entry.elements[0].text);
			}
		}
	}
}
