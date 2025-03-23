class GlobalManager {
	constructor() {
		this.tocSel = document.getElementById("TOCSel");
		this.entryField = document.getElementById("EntryField");
		this.searchButton = document.getElementById("SearchButton");
	}
}	// end of GlobalManager class
const G = new GlobalManager();

G.entryField.focus();

class Regulator {
	constructor() {
		this.conversionTable = {
			ー: "-",
			あ: "あ", ぁ: "あ",
			い: "い", ぃ: "い",
			う: "う", ゔ: "う", ぅ: "う",
			え: "え", ぇ: "え",
			お: "お", ぉ: "お",
			か: "か", が: "か", ゕ: "か",
			き: "き", ぎ: "き",
			く: "く", ぐ: "く",
			け: "け", げ: "け", ゖ: "け",
			こ: "こ", ご: "こ",
			さ: "さ", ざ: "さ",
			し: "し", じ: "し",
			す: "す", ず: "す",
			せ: "せ", ぜ: "せ",
			そ: "そ", ぞ: "そ",
			た: "た", だ: "た",
			ち: "ち", ぢ: "ち",
			つ: "つ", づ: "つ", っ: "つ",
			て: "て", で: "て",
			と: "と", ど: "と",
			な: "な", 
			に: "に",
			ぬ: "ぬ",
			ね: "ね",
			の: "の",
			は: "は", ば: "は", ぱ: "は",
			ひ: "ひ", び: "ひ", ぴ: "ひ",
			ふ: "ふ", ぶ: "ふ", ぷ: "ふ",
			へ: "へ", べ: "へ", ぺ: "へ",
			ほ: "ほ", ぼ: "ほ", ぽ: "ほ",
			ま: "ま",
			み: "み",
			む: "む",
			め: "め",
			も: "も",
			や: "や", ゃ: "や",
			ゆ: "ゆ", ゅ: "ゆ",
			よ: "よ", ょ: "よ",
			ら: "ら",
			り: "り",
			る: "る",
			れ: "れ",
			ろ: "ろ",
			わ: "わ", ゎ: "わ",
			ゐ: "ゐ",
			ゑ: "ゑ",
			を: "を",
			ん: "ん",
		};
	}
	regulate(str) {
		let result = "";
		let ar = str.split("");
		for (let i = 0; i < ar.length; i++) {
			if (ar[i] in this.conversionTable) {
				result += this.conversionTable[ar[i]];
			}
		}
		return result;
	}
}	// end of Regulator class

const R = new Regulator();
G.tocSel.appendChild(document.createElement("option"));
for (let i = 0; i < indexData[0].length; i++) {
	let name = indexData[0][i][0];
	let val = indexData[0][i][1]
	let elem = document.createElement("option");
	elem.text = name;
	elem.value = val;
	G.tocSel.appendChild(elem);
}
G.entryField.focus();
document.addEventListener("keyup", (evt) => {
	if (evt.key == "Enter") {
		search();
	} else if (evt.key == "Escape") {
		clearField();
	}
}, false);

function windowOpen(page) {
	window.open(baseURL + page, "検索結果");
	G.entryField.focus();
}

function search() {
	G.tocSel.selectedIndex = 0;
	let target = G.entryField.value;
	target = target.replace(/[ァ-ン]/g, (s) => {
		return String.fromCharCode(s.charCodeAt(0) - 0x60);
	});
	let rTarget = R.regulate(target);
	if (rTarget.length == 0)  return;
	let idx = indexData[1].length - 1;
	while ((idx >= 0) && (indexData[1][idx][0] > rTarget)) {
		idx--;
	}
	windowOpen(indexData[1][idx][1]);
}

function tocChange(val) {
	G.entryField.value = "";
	windowOpen(val);
}

function clearField() {
	G.tocSel.selectedIndex = 0;
	G.entryField.value = "";
	G.entryField.focus();
}
