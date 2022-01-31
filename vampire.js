class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVamps = 0;
    let currentVamp = this;
    while (currentVamp.creator) {
        currentVamp = currentVamp.creator;
        numberOfVamps++;
    }
    return numberOfVamps;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    levelsThis = this.numberOfVampiresFromOriginal();
    levelsOther = vampire.numberOfVampiresFromOriginal();
    if (levelsThis > levelsOther) {
        return false;
    } else {
        return true;
    }
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (name === this.name){
      return this
    }
    for (let vamp of this.offspring) {
      let found = vamp.vampireWithName(name);
      if (found) {
        return found
      }
    }
    return null
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let vampTotal = 0;
    for (let vampire of this.offspring) {
      vampTotal += vampire.totalDescendents + 1;
    } 
    return vampTotal
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennialVampires = [];
    if (this.yearConverted > 1980) {
      millennialVampires.push(this)
    } 
    for (let vampire of this.offspring) {
      millennialVampires = millennialVampires.concat(vampire.allMillennialVampires)
    }
    return millennialVampires
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

module.exports = Vampire;

