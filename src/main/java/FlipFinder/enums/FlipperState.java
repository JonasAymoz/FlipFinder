package FlipFinder.enums;

public enum FlipperState {
    //Objets directement construits
    OK ("OK"),
    DEAD ("dead"),
    DISAPEARED ("disapeared"),
    ELSE ("else");

    private String name = "";

    //Constructeur
    FlipperState(String name){
        this.name = name;
    }

    public String toString(){
        return name;
    }
}