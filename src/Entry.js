export default class Entry {
  constructor() {
    this.title = '';
    this.description = '';
    this.key = null;
    this.links = [];
  }

  setTitle(t) { this.title = t; }
  setDescription(d) { this.description = d; }
  setKey(k) { this.key = k; }
  setLinks(l) { this.links = l; }
}
