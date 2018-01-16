package FlipFinder.db.generated;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QFlipModel is a Querydsl query type for FlipModel
 */
@Generated("com.querydsl.sql.codegen.MetaDataSerializer")
public class QFlipModel extends com.querydsl.sql.RelationalPathBase<FlipModel> {

    private static final long serialVersionUID = 1716100296;

    public static final QFlipModel flipModel = new QFlipModel("ff_flip_Model");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath missions = createString("missions");

    public final StringPath name = createString("name");

    public final com.querydsl.sql.PrimaryKey<FlipModel> primary = createPrimaryKey(id);

    public final com.querydsl.sql.ForeignKey<Flipper> _ffFlipperFfFlipModelIdFk = createInvForeignKey(id, "model");

    public QFlipModel(String variable) {
        super(FlipModel.class, forVariable(variable), "null", "ff_flip_Model");
        addMetadata();
    }

    public QFlipModel(String variable, String schema, String table) {
        super(FlipModel.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QFlipModel(String variable, String schema) {
        super(FlipModel.class, forVariable(variable), schema, "ff_flip_Model");
        addMetadata();
    }

    public QFlipModel(Path<? extends FlipModel> path) {
        super(path.getType(), path.getMetadata(), "null", "ff_flip_Model");
        addMetadata();
    }

    public QFlipModel(PathMetadata metadata) {
        super(FlipModel.class, metadata, "null", "ff_flip_Model");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(missions, ColumnMetadata.named("missions").withIndex(3).ofType(Types.VARCHAR).withSize(255));
        addMetadata(name, ColumnMetadata.named("name").withIndex(2).ofType(Types.VARCHAR).withSize(50));
    }

}

