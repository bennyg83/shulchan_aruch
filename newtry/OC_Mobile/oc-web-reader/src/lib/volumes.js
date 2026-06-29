/**
 * Shulchan Aruch volumes for the web reader (corpus catalog per section).
 * Set `enabled: true` when catalog + publish pipeline are live.
 */
export const VOLUMES = [
  {
    id: "oc1",
    label: "Orach Chayim",
    short: "OC",
    catalogPath: "/corpus/oc1/catalog.json",
    simanCount: 697,
    enabled: true,
  },
  {
    id: "yd1",
    label: "Yoreh De'ah",
    short: "YD",
    catalogPath: "/corpus/yd1/catalog.json",
    simanCount: 403,
    enabled: true,
  },
  {
    id: "eh1",
    label: "Even HaEzer",
    short: "EH",
    catalogPath: "/corpus/eh1/catalog.json",
    simanCount: 178,
    enabled: true,
  },
  {
    id: "cm1",
    label: "Choshen Mishpat",
    short: "CM",
    catalogPath: "/corpus/cm1/catalog.json",
    simanCount: 427,
    enabled: false,
  },
];

export function bundlePathForVolume(volumeId, siman) {
  return `/corpus/${volumeId}/bundles/siman${siman}.json`;
}

export const DEFAULT_VOLUME_ID = "oc1";

export function getVolume(id) {
  return VOLUMES.find((v) => v.id === id) ?? VOLUMES.find((v) => v.id === DEFAULT_VOLUME_ID);
}

export function resolveVolumeId(preferred) {
  const v = getVolume(preferred);
  if (v?.enabled) return v.id;
  return DEFAULT_VOLUME_ID;
}
