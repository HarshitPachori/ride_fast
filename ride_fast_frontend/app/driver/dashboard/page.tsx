import AllocatedRides from "@/components/DriverDashBoard/AllocatedRides";
import CurrentRides from "@/components/DriverDashBoard/CurrentRides";
import DriverMyRides from "@/components/DriverDashBoard/DriverMyRides";
import StartedRide from "@/components/DriverDashBoard/StartedRide";
import GuardComponent from "@/components/Auth/GuardComponent";
import DriverDashboardLayout from "@/components/Layout/DriverDashboardLayout";

const page = () => {
  return (
    <GuardComponent>
      <DriverDashboardLayout>
        <div className="px-10">
          <DriverMyRides />
          <StartedRide />
          <CurrentRides />
          <AllocatedRides />
        </div>
      </DriverDashboardLayout>
    </GuardComponent>
  );
};

export default page;
