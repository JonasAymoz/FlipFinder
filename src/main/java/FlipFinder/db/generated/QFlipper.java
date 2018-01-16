package FlipFinder.db.generated;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QFlipper is a Querydsl query type for Flipper
 */
@Generated("com.querydsl.sql.codegen.MetaDataSerializer")
public class QFlipper extends com.querydsl.sql.RelationalPathBase<Flipper> {

    private static final long serialVersionUID = -503208292;

    public static final QFlipper flipper = new QFlipper("ff_flipper");

    public final StringPath active = createString("active");

    public final DatePath<java.time.LocalDate> addDate = createDate("addDate", java.time.LocalDate.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DatePath<java.time.LocalDate> lastSeen = createDate("lastSeen", java.time.LocalDate.class);

    public final NumberPath<Long> model = createNumber("model", Long.class);

    public final NumberPath<Long> place = createNumber("place", Long.class);

    public final NumberPath<Integer> price1 = createNumber("price1", Integer.class);

    public final NumberPath<Integer> price2 = createNumber("price2", Integer.class);

    public final com.querydsl.sql.PrimaryKey<Flipper> primary = createPrimaryKey(id);

    public final com.querydsl.sql.ForeignKey<Place> ffFlipperFfPlaceIdFk = createForeignKey(place, "id");

    public final com.querydsl.sql.ForeignKey<FlipModel> ffFlipperFfFlipModelIdFk = createForeignKey(model, "id");

    public QFlipper(String variable) {
        super(Flipper.class, forVariable(variable), "null", "ff_flipper");
        addMetadata();
    }

    public QFlipper(String variable, String schema, String table) {
        super(Flipper.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QFlipper(String variable, String schema) {
        super(Flipper.class, forVariable(variable), schema, "ff_flipper");
        addMetadata();
    }

    public QFlipper(Path<? extends Flipper> path) {
        super(path.getType(), path.getMetadata(), "null", "ff_flipper");
        addMetadata();
    }

    public QFlipper(PathMetadata metadata) {
        super(Flipper.class, metadata, "null", "ff_flipper");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(active, ColumnMetadata.named("active").withIndex(2).ofType(Types.VARCHAR).withSize(20));
        addMetadata(addDate, ColumnMetadata.named("add_date").withIndex(3).ofType(Types.DATE).withSize(10));
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(lastSeen, ColumnMetadata.named("last_seen").withIndex(4).ofType(Types.DATE).withSize(10));
        addMetadata(model, ColumnMetadata.named("model").withIndex(7).ofType(Types.BIGINT).withSize(19));
        addMetadata(place, ColumnMetadata.named("place").withIndex(8).ofType(Types.BIGINT).withSize(19));
        addMetadata(price1, ColumnMetadata.named("price1").withIndex(5).ofType(Types.INTEGER).withSize(10));
        addMetadata(price2, ColumnMetadata.named("price2").withIndex(6).ofType(Types.INTEGER).withSize(10));
    }

}

