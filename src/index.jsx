import ForgeUI, {
  render,
  Fragment,
  Macro,
  Image,
  Button,
  TextArea,
  Code,
  useConfig,
  useState,
  MacroConfig,
  ButtonSet,
  Text,
  Strong,
} from "@forge/ui";
import * as js2flowchart from "js2flowchart";

const { createPresentationGenerator } = js2flowchart;

const defaultConfig = {
  code: "",
};

const App = () => {
  const config = useConfig() || defaultConfig;

  const presentationGenerator = createPresentationGenerator(config.code);
  const slides = presentationGenerator.buildSlides();

  const [showCode, setShowCode] = useState(false);
  const [btnTitle, setBtnTitle] = useState("View code");
  const [slideNum, setSlideNum] = useState(4);

  const slideNames = [
    "Exports",
    "Imports and Exports",
    "Classes and functions",
    "Dependencies between functions",
    "All flowchart details details",
  ];

  const svg = slides[slideNum];

  return (
    <Fragment>
      {showCode ? (
        <Code text={config.code} language="javascript" />
      ) : (
        <Fragment>
          <Image
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
            alt="diagram"
          />
          <Text>
            <Strong>{slideNames[slideNum]}</Strong>
          </Text>
          <ButtonSet>
            <Button
              text="Prev"
              onClick={() => {
                setSlideNum(slideNum - 1);
                if (slideNum <= 0) setSlideNum(4);
              }}
            />
            <Button
              text="Next"
              onClick={() => {
                setSlideNum(slideNum + 1);
                if (slideNum >= 4) setSlideNum(0);
              }}
            />
          </ButtonSet>
        </Fragment>
      )}
      <Button
        text={btnTitle}
        onClick={function () {
          setShowCode(!showCode);
          if (showCode) {
            setBtnTitle("View code");
          } else {
            setBtnTitle("View flowchart");
          }
        }}
      />
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);

const Config = () => {
  return (
    <MacroConfig>
      <TextArea label="Enter Javascript code" name="code" />
    </MacroConfig>
  );
};

export const config = render(<Config />);
