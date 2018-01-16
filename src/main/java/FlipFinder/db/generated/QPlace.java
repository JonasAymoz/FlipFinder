package FlipFinder.db.generated;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QPlace is a Querydsl query type for Place
 */
@Generated("com.querydsl.sql.codegen.MetaDataSerializer")
public class QPlace extends com.querydsl.sql.RelationalPathBase<Place> {

    private static final long serialVersionUID = 951719187;

    public static final QPlace place = new QPlace("ff_place");

    public final StringPath address = createString("address");

    public final StringPath city = createString("city");

    public final SimplePath<Object> coord = createSimple("coord", Object.class);

    public final DatePath<java.time.LocalDate> creationDate = createDate("creationDate", java.time.LocalDate.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Float> lat = createNumber("lat", Float.class);

    public final NumberPath<Float> lng = createNumber("lng", Float.class);

    public final StringPath name = createString("name");

    public final NumberPath<Integer> postalCode = createNumber("postalCode", Integer.class);

    public final StringPath schedule = createString("schedule");

    public final com.querydsl.sql.PrimaryKey<Place> primary = createPrimaryKey(id);

    public final com.querydsl.sql.ForeignKey<Flipper> _ffFlipperFfPlaceIdFk = createInvForeignKey(id, "place");

    public QPlace(String variable) {
        super(Place.class, forVariable(variable), "null", "ff_place");
        addMetadata();
    }

    public QPlace(String variable, String schema, String table) {
        super(Place.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QPlace(String variable, String schema) {
        super(Place.class, forVariable(variable), schema, "ff_place");
        addMetadata();
    }

    public QPlace(Path<? extends Place> path) {
        super(path.getType(), path.getMetadata(), "null", "ff_place");
        addMetadata();
    }

    public QPlace(PathMetadata metadata) {
        super(Place.class, metadata, "null", "ff_place");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(address, ColumnMetadata.named("address").withIndex(3).ofType(Types.VARCHAR).withSize(200));
        addMetadata(city, ColumnMetadata.named("city").withIndex(5).ofType(Types.VARCHAR).withSize(100));
        addMetadata(coord, ColumnMetadata.named("coord").withIndex(7).ofType(Types.OTHER));
        addMetadata(creationDate, ColumnMetadata.named("creation_date").withIndex(8).ofType(Types.DATE).withSize(10));
        addMetadata(id, ColumnMetadata.named("id").withIndex(1).ofType(Types.BIGINT).withSize(19).notNull());
        addMetadata(lat, ColumnMetadata.named("lat").withIndex(9).ofType(Types.REAL).withSize(10).withDigits(6));
        addMetadata(lng, ColumnMetadata.named("lng").withIndex(10).ofType(Types.REAL).withSize(10).withDigits(6));
        addMetadata(name, ColumnMetadata.named("name").withIndex(2).ofType(Types.VARCHAR).withSize(200));
        addMetadata(postalCode, ColumnMetadata.named("postalCode").withIndex(4).ofType(Types.INTEGER).withSize(10));
        addMetadata(schedule, ColumnMetadata.named("schedule").withIndex(6).ofType(Types.VARCHAR).withSize(250));
    }

}

