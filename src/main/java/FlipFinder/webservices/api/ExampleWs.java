package FlipFinder.webservices.api;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import FlipFinder.db.generated.Flipper;
import FlipFinder.services.FlipperService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import FlipFinder.services.configuration.ConfigurationService;
import FlipFinder.webservices.api.data.Test;

@Path("/example")
@Api("Manage exemple web-services")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class ExampleWs {

	private final ConfigurationService configurationService;
	private final FlipperService flipperService;
	
	@Inject
	public ExampleWs(ConfigurationService configurationService, FlipperService flipperService ) {
		this.configurationService = configurationService;
		this.flipperService = flipperService;
	}

	@GET
	@Path("/test/{name}")
	@ApiOperation("Example web-service")
	public Test test(@ApiParam(required = true) @PathParam("name") String name) {
		return new Test("hello " + name + "\n" + configurationService.hello());
	}

	@GET
	@Path("/flip/{id}")
	@ApiOperation("Example web-service")
	public Test getFlippers(@ApiParam(required = true) @PathParam("id") int id) {


		return new Test("hello "  + "\n" + configurationService.hello());

	}
	
}
