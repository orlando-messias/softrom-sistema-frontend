// react
import React, { useState } from 'react';
// material-ui
import { useHistory } from 'react-router';
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import {
  Dashboard as DashboardIcon,
  MonetizationOn as MonetizationOnIcon,
  BarChart as BarChartIcon,
  SettingsApplications as SettingsApplicationsIcon,
  Widgets as WidgetsIcon,
  AccountBalance as AccountBalanceIcon,
  Assignment as AssignmentIcon,
  Business as BusinessIcon,
  Money as MoneyIcon,
  AccountBox as AccountBoxIcon,
  CreditCard as CreditCardIcon,
  SupervisedUserCircle as SupervisedUserCircleIcon,
  Description as DescriptionIcon,
  LocalAtm as LocalAtmIcon,
  LocationCity as LocationCityIcon,
  ContactMail as ContactMailIcon,
  AttachMoney as AttachMoneyIcon,
  ExpandLess,
  ExpandMore,
  Cancel as CancelIcon,
  Work as WorkIcon,
  GroupWork as GroupWorkIcon
} from '@material-ui/icons';
// styles
import useStyles from './ListMenuStyles';


// LISTMENU COMPONENT
export default function ListMenu() {
  const [openCadastro, setOpenCadastro] = useState(false);
  const [openDiversos, setOpenDiversos] = useState(false);
  const [openLancamento, setOpenLancamento] = useState(false);

  const styles = useStyles();
  const history = useHistory();

  const handleMenuClick = (menu) => {
    if (menu === "cadastro") {
      setOpenCadastro(!openCadastro);
    }
    if (menu === "diversos") {
      setOpenDiversos(!openDiversos);
    }
    if (menu === "lancamento") {
      setOpenLancamento(!openLancamento);
    }
  };

  const handleLinkClick = (page) => {
    history.push(`/${page}`)
  }

  return (
    <List>
      <ListItem button onClick={() => handleLinkClick('dashboard')}>
        <ListItemIcon>
          <DashboardIcon className={styles.itemIcon} />
        </ListItemIcon>
        <ListItemText >
          <Typography className={styles.item}>Dashboard</Typography>
        </ListItemText>
      </ListItem>
      <ListItem button onClick={() => handleMenuClick("cadastro")}>
        <ListItemIcon>
          <ContactMailIcon className={styles.itemIcon} />
        </ListItemIcon>
        <ListItemText >
          <Typography className={styles.item}>Cadastro</Typography>
        </ListItemText>
        {openCadastro
          ? <ExpandLess className={styles.item} />
          : <ExpandMore className={styles.item} />}
      </ListItem>

      {/* itens inside menu Cadastro */}
      <Collapse in={openCadastro} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button onClick={() => handleLinkClick('empresas')}>
            <ListItemIcon>
              <LocationCityIcon className={styles.subItemIcon} />
            </ListItemIcon>
            <ListItemText >
              <Typography className={styles.subItem}>Empresas</Typography>
            </ListItemText>
          </ListItem>
          <ListItem button onClick={() => handleLinkClick('participantes')}>
            <ListItemIcon>
              <SupervisedUserCircleIcon className={styles.subItemIcon} />
            </ListItemIcon>
            <ListItemText >
              <Typography className={styles.subItem}>Participantes</Typography>
            </ListItemText>
          </ListItem>
          <ListItem button onClick={() => handleLinkClick("contrato")}>
            <ListItemIcon>
              <AssignmentIcon className={styles.subItemIcon} />
            </ListItemIcon>
            <ListItemText >
              <Typography className={styles.subItem}>Contratos</Typography>
            </ListItemText>
          </ListItem>
          <ListItem button onClick={() => handleMenuClick("diversos")}>
            <ListItemIcon className={styles.subItemMenuIcon}>
              <WidgetsIcon className={styles.itemIcon} />
            </ListItemIcon>
            <ListItemText >
              <Typography className={styles.item}>Diversos</Typography>
            </ListItemText>
            {openDiversos
              ? <ExpandLess className={styles.item} />
              : <ExpandMore className={styles.item} />}
          </ListItem>

          {/* itens inside menu Diversos */}
          <Collapse in={openDiversos} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button onClick={() => handleLinkClick('atividade')}>
                <ListItemIcon>
                  <AssignmentIcon className={styles.subSubItemIcon} />
                </ListItemIcon>
                <ListItemText  >
                  <Typography className={styles.subItem}>Atividades</Typography>
                </ListItemText>
              </ListItem>
              <ListItem button onClick={() => handleLinkClick('filiais')}>
                <ListItemIcon>
                  <BusinessIcon className={styles.subSubItemIcon} />
                </ListItemIcon>
                <ListItemText  >
                  <Typography className={styles.subItem}>Filiais</Typography>
                </ListItemText>
              </ListItem>
              <ListItem button onClick={() => handleLinkClick('bancos')}>
                <ListItemIcon>
                  <AccountBalanceIcon className={styles.subSubItemIcon} />
                </ListItemIcon>
                <ListItemText  >
                  <Typography className={styles.subItem}>Bancos</Typography>
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <MoneyIcon className={styles.subSubItemIcon} />
                </ListItemIcon>
                <ListItemText  >
                  <Typography className={styles.subItem}>Conta</Typography>
                </ListItemText>
              </ListItem>
              <ListItem button onClick={() => handleLinkClick('conta-contabil')}>
                <ListItemIcon>
                  <MoneyIcon className={styles.subSubItemIcon} />
                </ListItemIcon>
                <ListItemText  >
                  <Typography className={styles.subItem}>Conta Cont??bil</Typography>
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <AccountBoxIcon className={styles.subSubItemIcon} />
                </ListItemIcon>
                <ListItemText  >
                  <Typography className={styles.subItem}>Cargos</Typography>
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <CreditCardIcon className={styles.subSubItemIcon} />
                </ListItemIcon>
                <ListItemText  >
                  <Typography className={styles.subItem}>Credenciadora</Typography>
                </ListItemText>
              </ListItem>
              <ListItem button onClick={() => handleLinkClick('centro-custo')}>
                <ListItemIcon>
                  <CreditCardIcon className={styles.subSubItemIcon} />
                </ListItemIcon>
                <ListItemText  >
                  <Typography className={styles.subItem}>Centro Custo</Typography>
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <AccountBalanceIcon className={styles.subSubItemIcon} />
                </ListItemIcon>
                <ListItemText  >
                  <Typography className={styles.subItem}>Cta Bco Transfer??ncia</Typography>
                </ListItemText>
              </ListItem>
              <ListItem button onClick={() => handleLinkClick('grupos')}>
                <ListItemIcon>
                  <SupervisedUserCircleIcon className={styles.subSubItemIcon} />
                </ListItemIcon>
                <ListItemText  >
                  <Typography className={styles.subItem}>Grupos</Typography>
                </ListItemText>
              </ListItem>
              <ListItem button onClick={() => handleLinkClick('grupo-servico')}>
                <ListItemIcon>
                  <GroupWorkIcon className={styles.subSubItemIcon} />
                </ListItemIcon>
                <ListItemText  >
                  <Typography className={styles.subItem}>Grupos Servi??o</Typography>
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <DescriptionIcon className={styles.subSubItemIcon} />
                </ListItemIcon>
                <ListItemText  >
                  <Typography className={styles.subItem}>Modelo</Typography>
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <LocalAtmIcon className={styles.subSubItemIcon} />
                </ListItemIcon>
                <ListItemText  >
                  <Typography className={styles.subItem}>Pgto Condi????o</Typography>
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <LocalAtmIcon className={styles.subSubItemIcon} />
                </ListItemIcon>
                <ListItemText  >
                  <Typography className={styles.subItem}>Pgto Tipo</Typography>
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <WorkIcon className={styles.subSubItemIcon} />
                </ListItemIcon>
                <ListItemText  >
                  <Typography className={styles.subItem}>Vendedor</Typography>
                </ListItemText>
              </ListItem>
              <ListItem button onClick={() => handleLinkClick("servico")}>
                <ListItemIcon>
                  <BusinessIcon className={styles.subSubItemIcon} />
                </ListItemIcon>
                <ListItemText  >
                  <Typography className={styles.subItem}>Servi??o</Typography>
                </ListItemText>
              </ListItem>
              <ListItem button onClick={() => handleLinkClick("motivo-termino-contrato")}>
                <ListItemIcon>
                  <CancelIcon className={styles.subSubItemIcon} />
                </ListItemIcon>
                <ListItemText  >
                  <Typography className={styles.subItem}>T??rmino Contrato</Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Collapse>

      <ListItem button onClick={() => handleMenuClick("lancamento")}>
        <ListItemIcon>
          <MonetizationOnIcon className={styles.itemIcon} />
        </ListItemIcon>
        <ListItemText >
          <Typography className={styles.item}>Lan??amento</Typography>
        </ListItemText>
        {openLancamento
          ? <ExpandLess className={styles.item} />
          : <ExpandMore className={styles.item} />}
      </ListItem>

      {/* itens inside menu Lan??amento */}
      <Collapse in={openLancamento} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button>
            <ListItemIcon>
              <AttachMoneyIcon className={styles.subItemIcon} />
            </ListItemIcon>
            <ListItemText  >
              <Typography className={styles.subItem}>Contas Pagar</Typography>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AttachMoneyIcon className={styles.subItemIcon} />
            </ListItemIcon>
            <ListItemText  >
              <Typography className={styles.subItem}>Contas Receber</Typography>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountBalanceIcon className={styles.subItemIcon} />
            </ListItemIcon>
            <ListItemText  >
              <Typography className={styles.subItem}>Transfer??ncia</Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Collapse>

      <ListItem button>
        <ListItemIcon>
          <BarChartIcon className={styles.itemIcon} />
        </ListItemIcon>
        <ListItemText >
          <Typography className={styles.item}>Relat??rio</Typography>
        </ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SettingsApplicationsIcon className={styles.itemIcon} />
        </ListItemIcon>
        <ListItemText >
          <Typography className={styles.item}>Utilit??rio</Typography>
        </ListItemText>
      </ListItem>
    </List>
  )
};