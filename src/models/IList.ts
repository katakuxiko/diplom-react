export default interface IList {
  data: [
    {
      id: number|string;
      title: string;
      description: string;
      img?: string;
    }
  ];
}
