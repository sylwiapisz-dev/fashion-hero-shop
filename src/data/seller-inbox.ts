export interface SellerPanelOrder {
  id: string;
  customer: string;
  product: string;
  size: string;
  status: "Nowe" | "Wysłane" | "W trakcie wysyłki" | "Zwrot";
  statusNote: string;
  dateLabel: string;
}

export interface SellerPanelMessage {
  id: string;
  author: string;
  role: "Kupująca" | "Sprzedawca" | "System";
  sentAtLabel: string;
  body: string;
}

export interface SellerInboxThread {
  id: string;
  orderId: string;
  customer: string;
  subject: string;
  preview: string;
  sentAtLabel: string;
  unread: boolean;
  tag: string;
  suggestedReply: string;
  messages: SellerPanelMessage[];
}

export interface SellerAutomationRule {
  id: string;
  name: string;
  trigger: string;
  status: "Aktywne" | "Wstrzymane";
  audience: string;
  recommendation: string;
  preview: string;
}

export interface SellerNotificationEvent {
  id: string;
  orderId: string;
  customer: string;
  title: string;
  sentAtLabel: string;
  channel: "E-mail" | "Inbox kupującej";
  summary: string;
  body: string;
}

export const sellerProfile = {
  ownerName: "Sylwia Pisz",
  storeName: "Butik Piszofsit",
  helperText: "Prototyp do testów inboxu sprzedawcy i automatycznych powiadomień dla kupujących.",
};

export const sellerOrders: SellerPanelOrder[] = [
  {
    id: "#4821",
    customer: "Anna Kowalska",
    product: "Sukienka lniana",
    size: "M",
    status: "Wysłane",
    statusNote: "wysłane 21.06",
    dateLabel: "Dziś",
  },
  {
    id: "#4742",
    customer: "Maria Nowak",
    product: "Bluzka lniana",
    size: "S",
    status: "Nowe",
    statusNote: "pytanie o śledzenie",
    dateLabel: "Dziś",
  },
  {
    id: "#4698",
    customer: "Karolina Wiśniewska",
    product: "Spódnica midi",
    size: "L",
    status: "W trakcie wysyłki",
    statusNote: "etykieta gotowa",
    dateLabel: "Wczoraj",
  },
  {
    id: "#4521",
    customer: "Zofia Dąbrowska",
    product: "Sukienka boho",
    size: "XS",
    status: "Zwrot",
    statusNote: "dostarczona 18.06",
    dateLabel: "18.06",
  },
];

export const sellerInboxThreads: SellerInboxThread[] = [
  {
    id: "thread-4821",
    orderId: "#4821",
    customer: "Anna Kowalska",
    subject: "Czy paczka jest już nadana?",
    preview: "Cześć, czy możesz potwierdzić wysyłkę i numer śledzenia dla mojego zamówienia?",
    sentAtLabel: "Dziś, 09:14",
    unread: true,
    tag: "Wysyłka",
    suggestedReply:
      "Cześć Anno! Paczka do zamówienia #4821 została już nadana 21.06. Zaraz po aktywacji numeru śledzenia dostaniesz automatyczne powiadomienie w FashionHero.",
    messages: [
      {
        id: "thread-4821-message-1",
        author: "Anna Kowalska",
        role: "Kupująca",
        sentAtLabel: "Dziś, 09:14",
        body: "Cześć, czy możesz potwierdzić wysyłkę i numer śledzenia dla zamówienia #4821?",
      },
      {
        id: "thread-4821-message-2",
        author: "System FashionHero",
        role: "System",
        sentAtLabel: "Dziś, 09:16",
        body: "Do tej rozmowy możesz dodać automatyczne potwierdzenie nadania, gdy przewoźnik aktywuje tracking.",
      },
    ],
  },
  {
    id: "thread-4742",
    orderId: "#4742",
    customer: "Maria Nowak",
    subject: "Nie widzę linku do śledzenia",
    preview: "Czy numer przesyłki pojawi się jeszcze dziś? Chciałabym odebrać paczkę przed weekendem.",
    sentAtLabel: "Dziś, 08:41",
    unread: true,
    tag: "Tracking",
    suggestedReply:
      "Dzień dobry Mario! Numer śledzenia pojawi się automatycznie zaraz po zeskanowaniu przesyłki przez kuriera. Wyślę Ci też powiadomienie w inboxie FashionHero.",
    messages: [
      {
        id: "thread-4742-message-1",
        author: "Maria Nowak",
        role: "Kupująca",
        sentAtLabel: "Dziś, 08:41",
        body: "Dzień dobry, nie widzę jeszcze linku do śledzenia zamówienia #4742. Czy paczka wyjdzie dziś?",
      },
    ],
  },
  {
    id: "thread-4698",
    orderId: "#4698",
    customer: "Karolina Wiśniewska",
    subject: "Czy mogę dobrać pasującą górę?",
    preview: "Jeśli masz coś do tej spódnicy, chętnie dokupię w tym samym stylu.",
    sentAtLabel: "Wczoraj, 18:22",
    unread: false,
    tag: "Upsell",
    suggestedReply:
      "Karolino, do tej spódnicy dobrze pasuje nasza bluzka lniana w tym samym odcieniu. Mogę wysłać Ci automatyczną rekomendację po nadaniu paczki.",
    messages: [
      {
        id: "thread-4698-message-1",
        author: "Karolina Wiśniewska",
        role: "Kupująca",
        sentAtLabel: "Wczoraj, 18:22",
        body: "Jeśli masz coś pasującego do tej spódnicy, chętnie dokupię w tym samym stylu.",
      },
      {
        id: "thread-4698-message-2",
        author: "Sylwia Pisz",
        role: "Sprzedawca",
        sentAtLabel: "Wczoraj, 18:37",
        body: "Jasne, przygotuję rekomendację w automatycznym powiadomieniu po wysyłce.",
      },
    ],
  },
  {
    id: "thread-4521",
    orderId: "#4521",
    customer: "Zofia Dąbrowska",
    subject: "Chcę rozpocząć zwrot",
    preview: "Sukienka jest piękna, ale rozmiar XS okazał się zbyt mały. Jak mogę zgłosić zwrot?",
    sentAtLabel: "18.06, 12:05",
    unread: false,
    tag: "Zwrot",
    suggestedReply:
      "Zofio, już wysyłam instrukcję zwrotu. Po jej otwarciu kupująca dostanie też automatyczne przypomnienie o kolejnych krokach.",
    messages: [
      {
        id: "thread-4521-message-1",
        author: "Zofia Dąbrowska",
        role: "Kupująca",
        sentAtLabel: "18.06, 12:05",
        body: "Sukienka jest piękna, ale rozmiar XS okazał się zbyt mały. Jak mogę zgłosić zwrot?",
      },
    ],
  },
];

export const sellerAutomationRules: SellerAutomationRule[] = [
  {
    id: "after-purchase",
    name: "Po zakupie: potwierdzenie i podobny fason",
    trigger: "Po opłaceniu zamówienia",
    status: "Aktywne",
    audience: "Wszystkie nowe zamówienia",
    recommendation: "Pokaż podobny fason z tej samej kolekcji.",
    preview:
      "Dziękujemy za zakup! Gdy tylko przygotujemy przesyłkę, damy znać. Jeśli chcesz, możesz też zobaczyć podobny fason, który pasuje do wybranego modelu.",
  },
  {
    id: "after-shipping",
    name: "Po nadaniu: tracking i propozycja stylizacji",
    trigger: "Po zeskanowaniu etykiety przez kuriera",
    status: "Aktywne",
    audience: "Zamówienia w statusie wysłane",
    recommendation: "Dołącz propozycję dodatku pasującego do zamówienia.",
    preview:
      "Twoja przesyłka jest już w drodze. Numer śledzenia pojawi się poniżej. Do tej stylizacji polecamy też pasujący dodatek dostępny w sklepie sprzedawcy.",
  },
  {
    id: "after-delivery",
    name: "Po doręczeniu: prośba o opinię",
    trigger: "24 godziny po oznaczeniu jako dostarczone",
    status: "Aktywne",
    audience: "Kupujące z dostarczonym zamówieniem",
    recommendation: "Przypomnij o zostawieniu opinii i pokaż produkt komplementarny.",
    preview:
      "Mamy nadzieję, że zamówienie już dotarło. Daj znać, jak się sprawdza i zobacz produkty, które najczęściej wybierają kupujące do tego modelu.",
  },
  {
    id: "return-flow",
    name: "Zwrot: instrukcja i przypomnienie",
    trigger: "Po otwarciu zgłoszenia zwrotu",
    status: "Wstrzymane",
    audience: "Kupujące rozpoczynające zwrot",
    recommendation: "Wyślij instrukcję krok po kroku i przypomnienie po 48h.",
    preview:
      "Zwrot został rozpoczęty. W tej wiadomości kupująca dostaje instrukcję i kolejne kroki, a po dwóch dniach przypomnienie, jeśli zgłoszenie nadal jest otwarte.",
  },
];

export const sellerNotificationEvents: SellerNotificationEvent[] = [
  {
    id: "notification-4821",
    orderId: "#4821",
    customer: "Anna Kowalska",
    title: "Powiadomienie o nadaniu przesyłki",
    sentAtLabel: "Dziś, 10:02",
    channel: "Inbox kupującej",
    summary: "Kupująca dostała numer zamówienia, status wysyłki i rekomendację pasującego dodatku.",
    body:
      "Cześć Anno! Twoje zamówienie #4821 jest już w drodze. Tracking pojawi się, gdy przewoźnik aktywuje przesyłkę. Jeśli chcesz uzupełnić stylizację, zobacz też pasujący dodatek od sprzedawcy.",
  },
  {
    id: "notification-4742",
    orderId: "#4742",
    customer: "Maria Nowak",
    title: "Automatyczna odpowiedź o śledzeniu",
    sentAtLabel: "Dziś, 08:55",
    channel: "E-mail",
    summary: "System potwierdził przygotowanie wysyłki i zapowiedział dosłanie numeru śledzenia.",
    body:
      "Dzień dobry Mario! Zamówienie #4742 jest przygotowane do odbioru przez kuriera. Gdy numer śledzenia będzie aktywny, od razu dostaniesz następne powiadomienie.",
  },
  {
    id: "notification-4698",
    orderId: "#4698",
    customer: "Karolina Wiśniewska",
    title: "Rekomendacja do istniejącego zamówienia",
    sentAtLabel: "Wczoraj, 18:40",
    channel: "Inbox kupującej",
    summary: "Kupująca dostała propozycję dobrania pasującej bluzki do zamówionej spódnicy.",
    body:
      "Karolino, do Twojej spódnicy midi dobrze pasuje bluzka lniana z tej samej kolekcji. Jeśli chcesz, możesz dodać ją do kolejnego zamówienia jednym kliknięciem.",
  },
  {
    id: "notification-4521",
    orderId: "#4521",
    customer: "Zofia Dąbrowska",
    title: "Instrukcja zwrotu",
    sentAtLabel: "18.06, 12:18",
    channel: "E-mail",
    summary: "Kupująca otrzymała kroki zwrotu i przypomnienie o terminie odesłania produktu.",
    body:
      "Zofio, zwrot do zamówienia #4521 został rozpoczęty. W wiadomości znajdziesz kolejne kroki oraz przypomnienie, gdy zgłoszenie będzie nadal otwarte.",
  },
];
