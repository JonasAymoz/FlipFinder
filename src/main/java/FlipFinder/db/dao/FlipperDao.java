package FlipFinder.db.dao;

import FlipFinder.db.generated.Flipper;
import FlipFinder.db.generated.QFlipper;
import com.coreoz.plume.db.querydsl.crud.CrudDaoQuerydsl;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;

import javax.inject.Inject;
import javax.inject.Singleton;


@Singleton
public class FlipperDao extends CrudDaoQuerydsl<Flipper> {

    @Inject
    public FlipperDao(TransactionManagerQuerydsl transactionManager) {
        super(transactionManager, QFlipper.flipper, QFlipper.flipper.id.asc());
    }

}