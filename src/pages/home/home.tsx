import { MetaHead } from "common/meta-head";

const Home = () => (
  <>
    <MetaHead
      title="Home - Xmartlabs Template"
      description="Welcome to the Xmartlabs React Template homepage"
      keywords="react, template, xmartlabs"
      canonical="/"
      ogTitle="Home - Xmartlabs Template"
      ogDescription="Welcome to the Xmartlabs React Template homepage"
      ogUrl="/"
    />
    <div className="flex flex-1 items-center justify-center">
      <div>
        <p className="m-0 text-center text-5xl font-bold">
          This is the homepage.
        </p>
        <p className="mt-5 text-center text-lg">Feel free to spruce me up 😊</p>
      </div>
    </div>
  </>
);

export { Home };
