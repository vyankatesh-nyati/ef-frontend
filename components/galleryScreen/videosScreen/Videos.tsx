import GalleryElementModel from "@/models/GalleryElementModel";
import classes from "./Videos.module.scss";
import ReactPlayer from "react-player/lazy";

export default function VideosScreen({
  data,
}: {
  data: GalleryElementModel;
}): JSX.Element {
  return (
    <div className={classes.container}>
      <h1>{data.title}</h1>
      <div className={classes.videoContainer}>
        {data.data.map((element) => {
          return (
            <div className={classes.video} key={element.id}>
              <ReactPlayer
                url={element.path}
                controls={true}
                width={"100%"}
                height={"auto"}
                onError={(error) => {
                  console.log(error);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
