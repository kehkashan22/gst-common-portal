export class SectionDetail {

  public id: string;
  public video_url: string;
  public name: string;
  public number: string;
  public related_rules: string;
  public footnotes: string;
  public text: string;

  constructor(id: string, video_url: string, name: string, number: string, related_rules: string, footnotes: string, text: string) {
    this.id = id;
    this.video_url = video_url;
    this.name = name;
    this.number = number
    this.related_rules = related_rules;
    this.footnotes = footnotes;
    this.text = text;
  }
}
