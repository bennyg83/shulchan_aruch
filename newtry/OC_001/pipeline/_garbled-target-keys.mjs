/** Target garbled blocks: 447 (16), 467 (17), 498 (14) */
export const TARGETS = {
  447: [
    ...Object.keys(
      JSON.parse(
        await import("fs").then((fs) =>
          fs.readFileSync(new URL("./he447-bad-export.json", import.meta.url), "utf8")
        )
      )
    ),
    "chok-yaakov/1:ב",
    "chokhmat-shlomo/2:_",
  ],
  467: [
    ...Object.keys(
      JSON.parse(
        await import("fs").then((fs) =>
          fs.readFileSync(new URL("./he467-bad-export.json", import.meta.url), "utf8")
        )
      )
    ),
    "chatam-sofer/3:_",
    "chatam-sofer/11:_",
    "chokhmat-shlomo/1:_",
    "chokhmat-shlomo/2:_",
    "rabbi-akiva-eiger/8:_",
    "chok-yaakov/12:א",
    "chok-yaakov/9:ב",
    "turei-zahav/11:_",
    "peri-megadim/12:_",
  ],
  498: [
    "baer-heitev/8:_",
    "beur-hagra/2:ד",
    "beur-hagra/3:ד",
    "biur-halacha/3:א",
    "kaf-hachayyim/2:_",
    "kaf-hachayyim/9:_",
    "kaf-hachayyim/16:_",
    "kaf-hachayyim/18:_",
    "kaf-hachayyim/19:_",
    "magen-avraham/5:א",
    "mishnah-berurah/1:א",
    "mishnah-berurah/1:ו",
    "mishnah-berurah/2:א",
    "mishnah-berurah/3:ג",
  ],
};
