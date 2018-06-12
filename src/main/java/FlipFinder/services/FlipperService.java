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
import FlipFinder.webservices.api.data.FlipperBeanImage;
import com.coreoz.plume.db.crud.CrudService;
import com.google.common.base.Strings;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.io.File;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
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

    public List<FlipperBean> desactivateFlipper(Long id) {

        Flipper flip = flipperDao.findById(id);
        flip.setActive(FlipperState.DISAPEARED.name());
        flipperDao.save(flip);
        return getFlippersBean();

    }

    public FlipperPlaceModel getFlipper(Long id) {
        // todo refacto to flipperBean
        Flipper flip = flipperDao.findById(id);
        return new FlipperPlaceModel(flip, placeDao.findById(flip.getPlace()), flipModelDao.findById(flip.getModel()));

    }




    public FlipperBean addFlipper (FlipperBeanImage flipperBean) {

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


        // Add flip
        Flipper flip = new Flipper();
        flip.setActive(FlipperState.OK.name());
        flip.setPrice1(flipperBean.getPrice1());
        flip.setPrice2(flipperBean.getPrice2());

        //check if flipmodelId exist
        if(Strings.isNullOrEmpty(flipperBean.getFlipModelId())){
            //TODO : CHeck if name already exist in db bfore add
            FlipModel flipModel = new FlipModel();
            flipModel.setMissions(flipperBean.getMissions());
            flipModel.setName(flipperBean.getFlipName());
            flipModelDao.save(flipModel);
            flip.setModel(flipModel.getId());
        } else {
            flip.setModel(Long.parseLong(flipperBean.getFlipModelId()));
        }

        flip.setPlace(place.getId());
        flip.setAddDate(LocalDate.now());
        flip.setLastSeen(LocalDate.now());

        // add image
        //Optional<FileUploaded> fileId = fileService.upload(ProjectFileType.MAIN_IMAGE_ID, flipperBean.getImageFile());
        //flip.setMainImageId(fileId.get().getId());
        flipperDao.save(flip);

        return  fromFlipperBean(flipperBean, flip.getMainImageId());
    }

    private FlipperBean fromFlipperBean(FlipperBeanImage flipperBeanImage, Long mainImageId) {
        FlipperBean flipperBean = new FlipperBean();

        flipperBean.setId(flipperBeanImage.getId());
        flipperBean.setActive(flipperBeanImage.getActive());
        flipperBean.setPrice1(flipperBeanImage.getPrice1());
        flipperBean.setPrice2(flipperBeanImage.getPrice2());

        flipperBean.setAddress(flipperBeanImage.getAddress());
        flipperBean.setCity(flipperBeanImage.getCity());
        flipperBean.setPostalCode(flipperBeanImage.getPostalCode());
        flipperBean.setLat(flipperBeanImage.getLat());
        flipperBean.setLng(flipperBeanImage.getLng());
        flipperBean.setPlaceName(flipperBeanImage.getPlaceName());
        flipperBean.setSchedule(flipperBeanImage.getSchedule());

        flipperBean.setMissions(flipperBeanImage.getMissions());
        flipperBean.setFlipName(flipperBeanImage.getFlipName());
        flipperBean.setImageUrl(null);

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
        flipperBean.setLat(place.getLat().toString());
        flipperBean.setLng(place.getLng().toString());
        flipperBean.setPlaceName(place.getName());
        flipperBean.setSchedule(place.getSchedule());

        flipperBean.setMissions(model.getMissions());
        flipperBean.setFlipName(model.getName());
        flipperBean.setImageUrl(null);

        return flipperBean;
    }

}
