let positions = []
  
positions["5050"] = { "position": "0"}
positions["25050"] = {"position": "1"}
positions["45050"] = {"position": "2"}
positions["50250"] = {"position": "3"}
positions["250250"] = { "position": "4"}
positions["450250"] = { "position": "5"}
positions["50450"] = {"position": "6"}
positions["250450"] = { "position": "7"}
positions["450450"] = { "position": "8"}
positions["100100"] = { "position": "0"}
positions["300100"] = { "position": "1"}
positions["500100"] = { "position": "2"}
positions["100300"] = { "position": "3"}
positions["300300"] = { "position": "4"}
positions["500300"] = { "position": "5"}
positions["100500"] = { "position": "6"}
positions["300500"] = { "position": "7"}
positions["500500"] = { "position": "8"}

export default positions;

export let posWins = {
  "02": [["25","100"], ["575","100"]],
  "06": [["100","25"], ["100","575"]],
  "08": [["25","25"], ["575","575"]],
  "17": [["300","25"], ["300","575"]],
  "26": [["25","575"], ["575","25"]],
  "28": [["500","25"], ["500","575"]],
  "35": [["25","300"], ["575","300"]],
  "68": [["25","500"], ["575","500"]],
}
