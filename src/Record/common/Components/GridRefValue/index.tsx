import { FC } from 'react';
import Sample from 'models/sample';
import { IonSpinner } from '@ionic/react';
import { observer } from 'mobx-react';
import { prettyPrintLocation } from '@flumens';
import './styles.scss';

function getValue(sample: Sample) {
  if (sample.isGPSRunning()) {
    return <IonSpinner />;
  }

  return prettyPrintLocation(sample.attrs.location);
}

type Props = {
  sample: Sample;
};

const GridRefValue: FC<Props> = ({ sample }) => {
  const value = getValue(sample);

  return <div className="gridref-label">{value}</div>;
};

export default observer(GridRefValue);
