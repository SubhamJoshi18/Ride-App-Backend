import { HTTP_STATUS } from '../constants/http-status.constant';
import { IDLE_MODULE } from '../constants/rides-constant';
import { DatabaseException } from '../exceptions';
import { fetchAllRides } from '../repository/rider.repository';

async function getAllNewRidesService() {
  const allRides = await fetchAllRides();

  const isValidArrayRides = Array.isArray(allRides) && allRides.length > 0;

  if (typeof isValidArrayRides === 'boolean' && !isValidArrayRides) {
    throw new DatabaseException(
      HTTP_STATUS.DATABASE_ERROR.CODE,
      `There are no any Available Rides Currently`,
    );
  }
  const filteredValidRides = allRides.filter(
    (data) => data.rideStatus.includes(IDLE_MODULE) && data.flare > 0,
  );
  return {
    allAvailableRides: filteredValidRides,
  };
}

export { getAllNewRidesService };
