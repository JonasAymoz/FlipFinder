package FlipFinder.db.beans;

import FlipFinder.db.generated.FlipModel;
import FlipFinder.db.generated.Flipper;
import FlipFinder.db.generated.Place;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
@AllArgsConstructor
@Value(staticConstructor = "of")

public class FlipperPlaceModel {

    private Flipper flipper;
    private Place place;
    private FlipModel flipModel;


}
