import { RouteName } from "routes/routes";
import { AppLink } from "common/app-link";
import { Container } from "common/container";

export const Navbar = () => (
  <div className="py-5 border-b-1 border-gray-300">
    <Container>
      <div className="flex justify-between items-center">
        <div>
          <AppLink routeName={RouteName.Home}>Logo goes here</AppLink>
        </div>
        <div className="flex items-center gap-5">
          <nav>
            <AppLink
              className="text-blue-500 hover:underline"
              routeName={RouteName.About}
            >
              About
            </AppLink>
          </nav>
        </div>
      </div>
    </Container>
  </div>
);
