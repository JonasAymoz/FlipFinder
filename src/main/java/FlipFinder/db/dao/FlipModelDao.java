package FlipFinder.db.dao;

import FlipFinder.db.generated.FlipModel;
import FlipFinder.db.generated.Place;
import FlipFinder.db.generated.QFlipModel;
import FlipFinder.db.generated.QPlace;
import com.coreoz.plume.db.querydsl.crud.CrudDaoQuerydsl;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;

import javax.inject.Inject;
import javax.inject.Singleton;


@Singleton
public class FlipModelDao extends CrudDaoQuerydsl<FlipModel> {

    @Inject
    public FlipModelDao(TransactionManagerQuerydsl transactionManager) {
        super(transactionManager, QFlipModel.flipModel, QFlipModel.flipModel.id.asc());
    }

}