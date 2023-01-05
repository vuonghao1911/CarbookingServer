const placeService = require("../services/PlaceService");
const Place = require("../modal/Place");
const Route = require("../modal/Route");

class PlaceController {
  async addPlace(req, res, next) {
    const { name, busStation } = req.body;
    //console.log(number);
    try {
      const place = new Place({
        name: name,
        busStation: busStation,
      });

      const saveplace = await placeService.savePlace(place);
      console.log(saveplace);
      return res.json(saveplace);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async addRoute(req, res, next) {
    const { carTypeId, intendTime, placeId } = req.body;
    //console.log(number);

    const Arrayplace = await Promise.all(
      placeId.map((e) => {
        const place = Place.findById(e.id);
        return place;
      })
    );

    try {
      const route = new Route({
        carTypeId: carTypeId,
        intendTime: intendTime,
        place: Arrayplace,
      });

      const saveRoute = await placeService.savePlace(route);
      console.log(saveRoute);
      return res.json(saveRoute);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getCustomerById(req, res, next) {
    const { userId } = req.params;
    console.log(userId);

    try {
      const customer = await Customer.findById(userId);

      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PlaceController();
