package FlipFinder.webservices.api;

import FlipFinder.db.dao.FlipModelDao;
import FlipFinder.db.generated.FlipModel;
import FlipFinder.services.FlipperService;
import FlipFinder.services.configuration.ConfigurationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/flipModel")
@Api("Manage exemple web-services")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class FlipperModelWs {

	private final ConfigurationService configurationService;
	private final FlipperService flipperService;
	private final FlipModelDao flipModelDao;

	@Inject
	public FlipperModelWs(ConfigurationService configurationService, FlipperService flipperService, FlipModelDao flipModelDao ) {
		this.configurationService = configurationService;
		this.flipperService = flipperService;
		this.flipModelDao = flipModelDao;
	}

	@GET
	@Path("/")
	@ApiOperation("All flippers")
	public List<FlipModel> getFlippers() {
		List<FlipModel> flipModelList = flipModelDao.findAll();
		return flipModelList;
	}

	
}
