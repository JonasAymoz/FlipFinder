package FlipFinder.guice;

import com.coreoz.plume.db.querydsl.guice.GuiceQuerydslModule;
import org.glassfish.jersey.server.ResourceConfig;

import FlipFinder.jersey.JerseyConfigProvider;

import com.coreoz.plume.conf.guice.GuiceConfModule;
import com.coreoz.plume.jersey.guice.GuiceJacksonModule;
import com.google.inject.AbstractModule;

/**
 * Group the Guice modules to install in the application
 */
public class ApplicationModule extends AbstractModule {

	@Override
	protected void configure() {
		install(new GuiceConfModule());
		install(new GuiceJacksonModule());
		// database & Querydsl installation
		install(new GuiceQuerydslModule());
		// file module
		//install(new GuiceFileModuleQuerydsl());
		//bind(FileTypesProvider.class).to(ProjectFileTypesProvider.class);

		// prepare Jersey configuration
		bind(ResourceConfig.class).toProvider(JerseyConfigProvider.class);
	}

}
