package FlipFinder.webservices.api;

import FlipFinder.db.beans.FlipperPlaceModel;
import FlipFinder.services.FlipperService;
import FlipFinder.services.configuration.ConfigurationService;
import FlipFinder.webservices.api.data.FlipperBean;
import FlipFinder.webservices.api.data.Test;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/flip")
@Api("Manage exemple web-services")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class FlipperWs {

	private final ConfigurationService configurationService;
	private final FlipperService flipperService;

	@Inject
	public FlipperWs(ConfigurationService configurationService, FlipperService flipperService ) {
		this.configurationService = configurationService;
		this.flipperService = flipperService;
	}


	@GET
	@Path("/")
	@ApiOperation("All flippers")
	public List<FlipperPlaceModel> getFlippers() {
		List<FlipperPlaceModel> flip = flipperService.getFlippers();
		return flip;

	}

	@GET
	@Path("/all")
	@ApiOperation("All flippers bean")
	public List<FlipperBean> getFlippersBean() {
		List<FlipperBean> flip = flipperService.getFlippersBean();
		return flip;

	}

	@GET
	@Path("/{id}")
	@ApiOperation("Get FlipperPlaceModel by id")
	public FlipperPlaceModel getFlipper(@ApiParam(required = true) @PathParam("id") Long id) {

		FlipperPlaceModel flip = flipperService.getFlipper(id);
		return flip;
	}

	@POST
	@ApiOperation("Add a flip")
	public FlipperBean addFlipper( FlipperBean flip) {

		FlipperBean addedFlip = flipperService.addFlipper(flip);
		return addedFlip;
	}
	
}