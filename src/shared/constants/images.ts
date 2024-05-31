import Fruit from '../../assets/img/categories/Frutas_categories.png';
import Vegetables from '../../assets/img/categories/verduras_categories.png';
import Meet from '../../assets/img/categories/carnes_categories.png';
import Fish from '../../assets/img/categories/pescados_mariscos_categories.png';
import Dairy from '../../assets/img/categories/lacteos_huevo_categories.png';
import Bread from '../../assets/img/categories/panaderia_categories.png';
import Frozen from '../../assets/img/categories/congelados_categories.png';
import Grocery from '../../assets/img/categories/despensa_categories.png';
import Drink from '../../assets/img/categories/bebidas_categories.png';
import Snak from '../../assets/img/categories/snacks_categories.png';
import PersonalCare from '../../assets/img/categories/cuidado_personal_categories.png';
import CleanySupplies from '../../assets/img/categories/limpieza_hogar_categories.png';

//? product
import Apple from '../../assets/img/products/Manzana_cat1.webp';
import Banana from '../../assets/img/products/Platanos_cat1.webp';
import Pear from '../../assets/img/products/pera_cat1.webp';
import Orange from '../../assets/img/products/naranjas_cat1.webp';
import Grape from '../../assets/img/products/uvas_cat1.webp';
import Lettuce from '../../assets/img/products/lechuga_cat2.webp';
import Spinach from '../../assets/img/products/espinaca_cat2.webp';
import Carrot from '../../assets/img/products/zanahoria_cat2.webp';
import Tomato from '../../assets/img/products/tomates_cat2.webp';
import Cucumber from '../../assets/img/products/pepinos_cat2.webp';
import Chicken from '../../assets/img/products/pollo_cat3.webp';
import Beef from '../../assets/img/products/res_cat3.webp';
import Pork from '../../assets/img/products/cerdo_cat3.webp';
import Turkey from '../../assets/img/products/pavo_cat3.webp';
import Lamb from '../../assets/img/products/cordero_cat3.webp';
import Salmon from '../../assets/img/products/salmon_cat4.webp';
import Trout from '../../assets/img/products/trucha_cat4.webp';
import Shrimp from '../../assets/img/products/camaron_cat4.webp';
import Squid from '../../assets/img/products/calamar_cat4.webp';
import Mussels from '../../assets/img/products/mejillones_cat4.webp';
import Milk from '../../assets/img/products/leche_cat5.webp';
import Cheese from '../../assets/img/products/queso_cat5.webp';
import Yogurt from '../../assets/img/products/yogurt_cat5.webp';
import Eggs from '../../assets/img/products/huevos_cat5.webp';
import Butter from '../../assets/img/products/mantequilla_cat5.webp';
import WhiteBread from '../../assets/img/products/pan_blanco_cat6.webp';
import WholeWheatBread from '../../assets/img/products/pan_integral_cat6.webp';
import Croissant from '../../assets/img/products/croissant_cat6.webp';
import Baguette from '../../assets/img/products/baguette_cat6.webp';
import Bun from '../../assets/img/products/bollo_cat6.webp';
import FrozenPizza from '../../assets/img/products/pizza_congelada_cat7.webp';
import FrozenVeggies from '../../assets/img/products/verduras_congeladas_cat7.webp';
import FrozenHamburger from '../../assets/img/products/hamburguesas_congeladas_cat7.webp';
import IceCream from '../../assets/img/products/helado_cat7.webp';
import Gloves from '../../assets/img/products/guante_cat12.webp';
import Detergent from '../../assets/img/products/detergente_cat12.webp';
import Desinfectant from '../../assets/img/products/desinfectante_cat12.webp';
import ToiletPaper from '../../assets/img/products/papel_higienico_cat12.webp';
import PaperTowel from '../../assets/img/products/toallas_de_papel_cat12.webp';
import SparklingWater from '../../assets/img/products/agua_mineral_cat9.webp';
import OrangeJuice from '../../assets/img/products/jugo_de_naranja_cat9.webp';
import Beer from '../../assets/img/products/cerveza_cat9.webp';
import Wine from '../../assets/img/products/vino_cat9.webp';
import Soda from '../../assets/img/products/refresco_cat9.webp';
import Chips from '../../assets/img/products/papas_fritas.webp';
import Walnuts from '../../assets/img/products/nueces_cat10.webp';
import Chocolate from '../../assets/img/products/chocolate_cat10.webp';
import Cookies from '../../assets/img/products/galletas_cat10.webp';
import Candy from '../../assets/img/products/caramelo_cat10.webp';
import Rice from '../../assets/img/products/arroz_cat8.webp';

export const CATEGORY_IMG: Record<string, string> = {
  '1': Fruit,
  '2': Vegetables,
  '3': Meet,
  '4': Fish,
  '5': Dairy,
  '6': Bread,
  '7': Frozen,
  '8': Grocery,
  '9': Drink,
  '10': Snak,
  '11': PersonalCare,
  '12': CleanySupplies,
};

export const PRODUCTS_IMG: Record<string, string> = {
  '1': Apple,
  '2': Banana,
  '3': Pear,
  '4': Orange,
  '5': Grape,
  '6': Lettuce,
  '7': Spinach,
  '8': Carrot,
  '9': Tomato,
  '10': Cucumber,
  '11': Chicken,
  '12': Beef,
  '13': Pork,
  '14': Turkey,
  '15': Lamb,
  '16': Salmon,
  '17': Trout,
  '18': Shrimp,
  '19': Squid,
  '20': Mussels,
  '21': Milk,
  '22': Cheese,
  '23': Yogurt,
  '24': Eggs,
  '25': Butter,
  '26': WhiteBread,
  '27': WholeWheatBread,
  '28': Croissant,
  '29': Baguette,
  '30': Bun,
  '31': FrozenPizza,
  '32': FrozenVeggies,
  '33': FrozenHamburger,
  '34': IceCream,
  '35': Gloves,
  '36': Detergent,
  '37': Desinfectant,
  '38': ToiletPaper,
  '39': PaperTowel,
  '40': SparklingWater,
  '41': OrangeJuice,
  '42': Beer,
  '43': Wine,
  '44': Soda,
  '45': Chips,
  '46': Walnuts,
  '47': Chocolate,
  '48': Cookies,
  '49': Candy,
  '50': Rice,
};
