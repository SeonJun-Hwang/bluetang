abstract class Animation {
  public abstract animate(): void;
  public abstract rollback(): void;
  public abstract recover(): void;
}

export default Animation;
