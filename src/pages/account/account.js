import styles from "./account.module.scss";
import { useState } from "react";
import { Tab } from "semantic-ui-react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks";
import {
  Info,
  Settings,
  Wishlist,
  Address,
  Orders,
} from "@/components/Account";
import { Separator, Seo } from "@/components/Shared";
import { BasicLayout } from "@/layouts/BasicLayout";

export default function Account() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [reload, setReload] = useState(false);

  if (!user) {
    router.push("/");
    return null;
  }

  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Mis pedidos",
      render: () => (
        <Tab.Pane attached={false}>
          <Orders />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Lista de deseos",
      render: () => (
        <div class="Lista de deseos">
          <Tab.Pane attached={false}>
            <Wishlist />
            <Separator height={80} />
          </Tab.Pane>
        </div>
      ),
    },
    {
      menuItem: "Direcciones",
      render: () => (
        <Tab.Pane attached={false}>
          <Address.AddAddress onReload={onReload} />
          <Address.ListAddresses reload={reload} onReload={onReload} />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 20, icon: "settings", content: "Ajustes" },
      render: () => (
        <Tab.Pane attached={false}>
          <Settings.ChangeNameForm />
          <div className={styles.containerForms}>
            <Settings.ChangeEmailForm />
            <Settings.ChangePasswordForm />
          </div>
          <Separator height={50} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 21,
        icon: "log out",
        context: "",
        onClick: logout,
      },
    },
  ];

  return (
    <>
      <Seo title="Mi cuenta" />
      <BasicLayout isContainer relative>
        <Info />

        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes}
          className={styles.tabs}
        />
      </BasicLayout>
    </>
  );
}
