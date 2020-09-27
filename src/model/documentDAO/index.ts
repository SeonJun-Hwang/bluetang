class DocumentDAO {
  private static instance: DocumentDAO;
  private id: string = '';
  private constructor() {}

  public static getInstance() {
    if (!DocumentDAO.instance) DocumentDAO.instance = new DocumentDAO();
    return DocumentDAO.instance;
  }

  get getId(): string {
    return this.id;
  }
  set setId(id: string) {
    this.id = id;
  }
}

export default DocumentDAO;
