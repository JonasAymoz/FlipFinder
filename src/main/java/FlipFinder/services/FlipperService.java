package FlipFinder.services;

import FlipFinder.db.beans.FlipperPlaceModel;
import FlipFinder.db.dao.FlipModelDao;
import FlipFinder.db.dao.FlipperDao;
import FlipFinder.db.dao.PlaceDao;
import FlipFinder.db.generated.FlipModel;
import FlipFinder.db.generated.Flipper;
import FlipFinder.db.generated.Place;
import FlipFinder.enums.FlipperState;
import FlipFinder.webservices.api.data.FlipperBean;
import com.coreoz.plume.db.crud.CrudService;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Singleton
public class FlipperService extends CrudService<Flipper> {

    private FlipperDao flipperDao;
    private PlaceDao placeDao;
    private FlipModelDao flipModelDao;

    @Inject
    public FlipperService(FlipperDao flipperDao, PlaceDao placeDao,FlipModelDao flipModelDao) {
        super(flipperDao);
        this.flipperDao = flipperDao;
        this.flipModelDao = flipModelDao;
        this.placeDao = placeDao;
    }

    public List<FlipperPlaceModel> getFlippers() {


        return flipperDao.findAll()
                .stream()
                .map(flip ->  new FlipperPlaceModel(flip, placeDao.findById(flip.getPlace()), flipModelDao.findById(flip.getModel())))
        .collect(Collectors.toList());
    }

    public List<FlipperBean> getFlippersBean() {

        return flipperDao.findAll()
                .stream()
                .map(flip -> toFlipperBean(flip))
                .collect(Collectors.toList());

    }



    public FlipperPlaceModel getFlipper(Long id) {

        Flipper flip = flipperDao.findById(id);
        return new FlipperPlaceModel(flip, placeDao.findById(flip.getPlace()), flipModelDao.findById(flip.getModel())  );

    }


    public FlipperBean addFlipper (FlipperBean flipperBean) {

        // Add place
        Place place = new Place();
        place.setAddress(flipperBean.getAddress());
        place.setCity(flipperBean.getCity());
        place.setPostalCode(flipperBean.getPostalCode());
        place.setName(flipperBean.getPlaceName());
        place.setSchedule(flipperBean.getSchedule());
        place.setCoord(flipperBean.getCoord());
        place.setLat(Float.parseFloat(flipperBean.getLat()));
        place.setLng(Float.parseFloat(flipperBean.getLng()));
        place.setCreationDate(LocalDate.now());
        placeDao.save(place);

        // Add FLipper Model
        FlipModel flipModel = new FlipModel();
        flipModel.setMissions(flipperBean.getMissions());
        flipModel.setName(flipperBean.getFlipName());
        flipModelDao.save(flipModel);

        // Add flip
        Flipper flip = new Flipper();
        flip.setActive(FlipperState.OK.name());
        flip.setPrice1(flipperBean.getPrice1());
        flip.setPrice2(flipperBean.getPrice2());
        flip.setModel(flipModel.getId());
        flip.setPlace(place.getId());
        flip.setAddDate(LocalDate.now());
        flip.setLastSeen(LocalDate.now());
        flipperDao.save(flip);


        return flipperBean;
    }


    public FlipperBean toFlipperBean (Flipper flip) {
        FlipperBean flipperBean = new FlipperBean();
        Place place = placeDao.findById(flip.getPlace());
        FlipModel model = flipModelDao.findById(flip.getModel());

        flipperBean.setId(flip.getId().toString());
        flipperBean.setActive(flip.getActive());
        flipperBean.setPrice1(flip.getPrice1());
        flipperBean.setPrice2(flip.getPrice2());
        flipperBean.setAddress(place.getAddress());
        flipperBean.setCity(place.getCity());
        flipperBean.setPostalCode(place.getPostalCode());
        flipperBean.setPlaceName(place.getName());
        flipperBean.setSchedule(place.getSchedule());
        flipperBean.setMissions(model.getMissions());
        flipperBean.setFlipName(model.getName());

        return flipperBean;
    }

}
