import { AppState, Action, Product } from '';

const initialState: AppState = {
  products: [],
  cart: [],
  loading: false,
  error: null,
  isEditing: false,
  editingProduct: null,
  searchTerm: '',
  priceFilter: '',
  priceRange: { min: 0, max: Infinity },
  currentPage: 1,
  itemsPerPage: 8
};

let state: AppState = initialState;

const subscribers: Array<(state: AppState) => void> = [];

export const getState = (): AppState => state;

export const dispatch = (action: Action): void => {
  state = reducer(state, action);
  subscribers.forEach((subscriber) => subscriber(state));
};

const filterProducts = (products: Product[], state: AppState): Product[] => {
  return products
    .filter(product => 
      product.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(state.searchTerm.toLowerCase())
    )
    .filter(product => 
      product.price >= state.priceRange.min && 
      product.price <= state.priceRange.max
    )
    .sort((a, b) => {
      if (state.priceFilter === 'asc') return a.price - b.price;
      if (state.priceFilter === 'desc') return b.price - a.price;
      return 0;
    });
};

const getPaginatedProducts = (products: Product[], state: AppState): Product[] => {
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  return products.slice(startIndex, startIndex + state.itemsPerPage);
};

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_PRODUCTS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_TO_CART':
      if (state.cart.some(item => item.id === action.payload.id)) {
        return state;
      }
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
        isEditing: false,
        editingProduct: null,
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case 'START_EDITING':
      return {
        ...state,
        isEditing: true,
        editingProduct: action.payload,
      };
    case 'STOP_EDITING':
      return {
        ...state,
        isEditing: false,
        editingProduct: null,
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
        currentPage: 1,
      };
    case 'SET_PRICE_FILTER':
      return {
        ...state,
        priceFilter: action.payload,
        currentPage: 1,
      };
    case 'SET_PRICE_RANGE':
      return {
        ...state,
        priceRange: action.payload,
        currentPage: 1,
      };
    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    case 'SET_ITEMS_PER_PAGE':
      return {
        ...state,
        itemsPerPage: action.payload,
        currentPage: 1,
      };
    case 'CLEAR_FILTERS':
      return {
        ...state,
        searchTerm: '',
        priceFilter: '',
        priceRange: { min: 0, max: Infinity },
        currentPage: 1,
      };
    default:
      return state;
  }
};

export const subscribe = (callback: (state: AppState) => void): void => {
  subscribers.push(callback);
  callback(state);
};

export const getFilteredAndPaginatedProducts = (): Product[] => {
  const filteredProducts = filterProducts(state.products, state);
  return getPaginatedProducts(filteredProducts, state);
};