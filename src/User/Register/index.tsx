import { FC, useContext } from 'react';
import userModel from 'models/user';
import appModel from 'models/app';
import { NavContext } from '@ionic/react';
import { Trans as T } from 'react-i18next';
import { Page, Header, device, useToast, useAlert, useLoader } from '@flumens';
import Main from './Main';
import './styles.scss';

export type Details = {
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

const RegisterContainer: FC = () => {
  const { navigate } = useContext(NavContext);
  const alert = useAlert();
  const toast = useToast();
  const loader = useLoader();

  const lang = appModel.attrs.language;

  const onSuccess = () => navigate('/home/user-records', 'root');

  async function onRegister(details: Details) {
    const email = details.email.trim();
    const { password, firstName, lastName } = details;

    const otherDetails = {
      field_first_name: [{ value: firstName?.trim() }],
      field_last_name: [{ value: lastName?.trim() }],
    };

    if (!device.isOnline) {
      toast.warn("Sorry, looks like you're offline.");
      return;
    }
    await loader.show('Please wait...');

    try {
      await userModel.register(email, password, otherDetails);

      userModel.attrs.firstName = firstName; // eslint-disable-line
      userModel.attrs.lastName = lastName; // eslint-disable-line
      userModel.save();

      alert({
        header: 'Welcome aboard!',
        message: (
          <T>
            Before submitting any records please check your email and click on
            the verification link.
          </T>
        ),
        buttons: [
          {
            text: 'OK, got it',
            role: 'cancel',
            handler: onSuccess,
          },
        ],
      });
    } catch (err: any) {
      toast.error(err);
    }

    loader.hide();
  }

  return (
    <Page id="user-register">
      <Header className="ion-no-border" />
      <Main
        schema={userModel.registerSchema}
        onSubmit={onRegister}
        lang={lang}
      />
    </Page>
  );
};

export default RegisterContainer;
