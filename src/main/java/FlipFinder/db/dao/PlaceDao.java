package FlipFinder.db.dao;

import FlipFinder.db.generated.Flipper;
import FlipFinder.db.generated.Place;
import FlipFinder.db.generated.QFlipper;
import FlipFinder.db.generated.QPlace;
import com.coreoz.plume.db.querydsl.crud.CrudDaoQuerydsl;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import org.jvnet.hk2.internal.Collector;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;
import java.util.stream.Collectors;


@Singleton
public class PlaceDao extends CrudDaoQuerydsl<Place> {

    @Inject
    public PlaceDao(TransactionManagerQuerydsl transactionManager) {
        super(transactionManager, QPlace.place, QPlace.place.id.asc());
    }


    @Override
    public List<Place> findAll() {
         return findAll().stream().map(this::addPlace).collect(Collectors.toList());

    }


    public Place addPlace (Place place) {
        return  place ;
    }


}