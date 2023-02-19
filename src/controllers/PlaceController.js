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
    const { carTypeId, intendTime, placeId} = req.body;
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
        place: Arrayplace
      });
      const saveRoute = await placeService.saveRoute(route);
      return res.json("Thành công!");
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
  async getPlace(req, res, next) {
    try {
      const place = await Place.find();
      res.json(place);
    } catch (error) {
      next(error);
    }
  }
  async getRoute(req, res, next) {
    try {
      const route = await Route.aggregate([
        {
          $lookup:
          {
            from: "cartypes",
            localField: "carTypeId",
            foreignField: "_id",
            as: "cartype"
          },
        },
        {
          "$project": {
            "_id": "$_id",
            "carType": "$cartype",
            "intendTime": "$intendTime",
            "place": "$place"
          },
        },
      ]);
      res.json(route);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PlaceController();
