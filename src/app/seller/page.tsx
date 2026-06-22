"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Bell, MessageSquareText, PackageCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  sellerAutomationRules,
  sellerInboxThreads,
  sellerNotificationEvents,
  sellerOrders,
  sellerProfile,
  type SellerAutomationRule,
  type SellerInboxThread,
} from "@/data/seller-inbox";

const statusClasses = {
  "Nowe": "bg-white text-charcoal border-black/15",
  "Wysłane": "bg-charcoal text-white border-charcoal",
  "W trakcie wysyłki": "bg-[#e7ecdf] text-charcoal border-[#d4dbc8]",
  "Zwrot": "bg-[#f4ebe6] text-charcoal border-[#e5d5cb]",
} as const;

const initialOrder = sellerOrders[0]!;
const initialThread = sellerInboxThreads[0]!;
const initialRule = sellerAutomationRules[0]!;
const initialNotification = sellerNotificationEvents[0]!;

function getUnreadCount(threads: SellerInboxThread[]) {
  return threads.filter((thread) => thread.unread).length;
}

function getConversationLabel(count: number) {
  if (count === 1) return "1 aktywna rozmowa";
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;

  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
    return `${count} aktywne rozmowy`;
  }

  return `${count} aktywnych rozmów`;
}

export default function SellerPage() {
  const [threads, setThreads] = useState(sellerInboxThreads);
  const [rules, setRules] = useState(sellerAutomationRules);
  const [selectedOrderId, setSelectedOrderId] = useState(initialOrder.id);
  const [selectedThreadId, setSelectedThreadId] = useState(initialThread.id);
  const [selectedRuleId, setSelectedRuleId] = useState(initialRule.id);
  const [selectedNotificationId, setSelectedNotificationId] = useState(initialNotification.id);

  const activeOrderId = sellerOrders.some((order) => order.id === selectedOrderId)
    ? selectedOrderId
    : initialOrder.id;
  const selectedOrder = sellerOrders.find((order) => order.id === activeOrderId) ?? initialOrder;

  const orderThreads = useMemo(
    () => threads.filter((thread) => thread.orderId === activeOrderId),
    [activeOrderId, threads]
  );
  const selectedThread =
    orderThreads.find((thread) => thread.id === selectedThreadId) ??
    orderThreads[0] ??
    threads.find((thread) => thread.id === selectedThreadId) ??
    initialThread;

  const orderNotifications = useMemo(
    () => sellerNotificationEvents.filter((notification) => notification.orderId === activeOrderId),
    [activeOrderId]
  );
  const selectedNotification =
    orderNotifications.find((notification) => notification.id === selectedNotificationId) ??
    orderNotifications[0] ??
    sellerNotificationEvents.find((notification) => notification.id === selectedNotificationId) ??
    initialNotification;

  const selectedRule =
    rules.find((rule) => rule.id === selectedRuleId) ?? initialRule;

  function handleOrderSelect(orderId: string) {
    setSelectedOrderId(orderId);

    const nextThread = threads.find((thread) => thread.orderId === orderId);
    if (nextThread) {
      setSelectedThreadId(nextThread.id);
      setThreads((currentThreads) =>
        currentThreads.map((thread) =>
          thread.id === nextThread.id ? { ...thread, unread: false } : thread
        )
      );
    }

    const nextNotification = sellerNotificationEvents.find(
      (notification) => notification.orderId === orderId
    );
    if (nextNotification) {
      setSelectedNotificationId(nextNotification.id);
    }
  }

  function handleThreadSelect(threadId: string) {
    setSelectedThreadId(threadId);
    setThreads((currentThreads) =>
      currentThreads.map((thread) =>
        thread.id === threadId ? { ...thread, unread: false } : thread
      )
    );
  }

  function toggleRule(ruleId: string) {
    setRules((currentRules) =>
      currentRules.map((rule) =>
        rule.id === ruleId
          ? {
              ...rule,
              status: rule.status === "Aktywne" ? "Wstrzymane" : "Aktywne",
            }
          : rule
      )
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-10">
      <nav className="text-[11px] text-warm-gray mb-6 tracking-wide">
        <Link href="/" className="hover:text-charcoal transition-colors">
          FashionHero
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-charcoal">Panel sprzedawcy</span>
      </nav>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-warm-gray mb-2">
            Usability test
          </p>
          <h1 className="text-3xl lg:text-[38px] font-light text-charcoal">
            Skrzynka odbiorcza i automatyzacje
          </h1>
          <p className="text-[14px] text-warm-gray mt-3 max-w-3xl">
            {sellerProfile.storeName} · {sellerProfile.ownerName}. {sellerProfile.helperText}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full lg:w-auto">
          <div className="rounded-2xl border border-black/10 bg-white p-4 min-w-[150px]">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.6px] text-warm-gray">
              <MessageSquareText className="h-4 w-4" />
              Inbox
            </div>
            <p className="mt-3 text-2xl font-light text-charcoal">{getUnreadCount(threads)}</p>
            <p className="text-[12px] text-warm-gray">nieprzeczytane rozmowy</p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-4 min-w-[150px]">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.6px] text-warm-gray">
              <PackageCheck className="h-4 w-4" />
              Zamówienia
            </div>
            <p className="mt-3 text-2xl font-light text-charcoal">{sellerOrders.length}</p>
            <p className="text-[12px] text-warm-gray">aktywne sprawy do obsługi</p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-4 min-w-[150px]">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.6px] text-warm-gray">
              <Sparkles className="h-4 w-4" />
              Automatyzacje
            </div>
            <p className="mt-3 text-2xl font-light text-charcoal">
              {rules.filter((rule) => rule.status === "Aktywne").length}
            </p>
            <p className="text-[12px] text-warm-gray">aktywne scenariusze</p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-4 min-w-[150px]">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.6px] text-warm-gray">
              <Bell className="h-4 w-4" />
              Powiadomienia
            </div>
            <p className="mt-3 text-2xl font-light text-charcoal">{sellerNotificationEvents.length}</p>
            <p className="text-[12px] text-warm-gray">ostatnie wysyłki do kupujących</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_360px]">
        <aside className="rounded-[28px] border border-black/10 bg-white p-5">
          <div className="flex items-center justify-between pb-4 border-b border-black/10">
            <div>
              <h2 className="text-[12px] font-medium uppercase tracking-[0.8px] text-charcoal">
                Zamówienia
              </h2>
              <p className="text-[12px] text-warm-gray mt-1">
                Każde zamówienie otwiera inbox i ostatnie powiadomienia.
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {sellerOrders.map((order) => {
              const orderThreadCount = threads.filter((thread) => thread.orderId === order.id).length;
              const isSelected = order.id === activeOrderId;

              return (
                <button
                  key={order.id}
                  type="button"
                  onClick={() => handleOrderSelect(order.id)}
                  className={cn(
                    "w-full rounded-2xl border px-4 py-4 text-left transition-colors",
                    isSelected
                      ? "border-charcoal bg-cream-light"
                      : "border-black/10 bg-white hover:border-charcoal/40"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-warm-gray">
                        Zamówienie {order.id}
                      </p>
                      <p className="mt-1 text-[15px] font-medium text-charcoal">{order.customer}</p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.6px]",
                        statusClasses[order.status]
                      )}
                    >
                      {order.status}
                    </span>
                  </div>

                  <p className="mt-3 text-[13px] text-charcoal/80">
                    {order.product} · rozmiar {order.size}
                  </p>
                  <p className="mt-1 text-[12px] text-warm-gray">{order.statusNote}</p>
                  <div className="mt-3 flex items-center justify-between text-[12px] text-warm-gray">
                    <span>{getConversationLabel(orderThreadCount)}</span>
                    <span>{order.dateLabel}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="space-y-6">
          <div className="rounded-[28px] border border-black/10 bg-white p-5 lg:p-6">
            <div className="flex flex-col gap-3 border-b border-black/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-[12px] font-medium uppercase tracking-[0.8px] text-charcoal">
                  Inbox sprzedawcy
                </h2>
                <p className="text-[13px] text-warm-gray mt-1">
                  Wybrano {selectedOrder.id} · {selectedOrder.customer}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="justify-center rounded-full px-4 text-[11px] uppercase tracking-[0.8px]"
              >
                Otwórz pełny widok rozmowy
              </Button>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="space-y-3">
                {orderThreads.map((thread) => (
                  <button
                    key={thread.id}
                    type="button"
                    onClick={() => handleThreadSelect(thread.id)}
                    className={cn(
                      "w-full rounded-2xl border px-4 py-4 text-left transition-colors",
                      selectedThread.id === thread.id
                        ? "border-charcoal bg-cream-light"
                        : "border-black/10 hover:border-charcoal/40"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[14px] font-medium text-charcoal">{thread.subject}</p>
                      {thread.unread && (
                        <span className="h-2.5 w-2.5 rounded-full bg-charcoal" />
                      )}
                    </div>
                    <p className="mt-1 text-[12px] text-warm-gray">
                      {thread.customer} · {thread.sentAt}
                    </p>
                    <p className="mt-3 text-[13px] text-charcoal/80">{thread.preview}</p>
                    <span className="mt-3 inline-flex rounded-full bg-cream px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.6px] text-charcoal">
                      {thread.tag}
                    </span>
                  </button>
                ))}
              </div>

              {selectedThread && (
                <div className="rounded-[24px] border border-black/10 bg-cream-light p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-warm-gray">
                        Szczegóły rozmowy
                      </p>
                      <h3 className="mt-2 text-xl font-light text-charcoal">
                        {selectedThread.subject}
                      </h3>
                    </div>
                    <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[10px] font-medium uppercase tracking-[0.6px] text-charcoal">
                      {selectedThread.orderId}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    {selectedThread.messages.map((message) => (
                      <div key={message.id} className="rounded-2xl bg-white p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[13px] font-medium text-charcoal">{message.author}</p>
                          <span className="text-[11px] text-warm-gray">{message.sentAt}</span>
                        </div>
                        <p className="mt-1 text-[11px] uppercase tracking-[0.6px] text-warm-gray">
                          {message.role}
                        </p>
                        <p className="mt-3 text-[13px] leading-6 text-charcoal/85">{message.body}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-dashed border-black/15 bg-white p-4">
                    <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-warm-gray">
                      Sugerowana odpowiedź
                    </p>
                    <p className="mt-3 text-[13px] leading-6 text-charcoal/85">
                      {selectedThread.suggestedReply}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button
                      type="button"
                      className="rounded-full px-4 text-[11px] uppercase tracking-[0.8px]"
                    >
                      Wyślij odpowiedź
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full px-4 text-[11px] uppercase tracking-[0.8px]"
                    >
                      Dodaj notatkę
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-[28px] border border-black/10 bg-white p-5">
            <div className="pb-4 border-b border-black/10">
              <h2 className="text-[12px] font-medium uppercase tracking-[0.8px] text-charcoal">
                Automatyzacje powiadomień
              </h2>
              <p className="text-[13px] text-warm-gray mt-1">
                Kliknij scenariusz, aby zobaczyć podgląd wiadomości do kupującej.
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {rules.map((rule: SellerAutomationRule) => (
                <button
                  key={rule.id}
                  type="button"
                  onClick={() => setSelectedRuleId(rule.id)}
                  className={cn(
                    "w-full rounded-2xl border px-4 py-4 text-left transition-colors",
                    selectedRule.id === rule.id
                      ? "border-charcoal bg-cream-light"
                      : "border-black/10 hover:border-charcoal/40"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[14px] font-medium text-charcoal">{rule.name}</p>
                      <p className="mt-1 text-[12px] text-warm-gray">{rule.trigger}</p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.6px]",
                        rule.status === "Aktywne"
                          ? "bg-charcoal text-white"
                          : "bg-white border border-black/10 text-charcoal"
                      )}
                    >
                      {rule.status}
                    </span>
                  </div>
                  <p className="mt-3 text-[12px] text-charcoal/75">{rule.audience}</p>
                </button>
              ))}
            </div>

            {selectedRule && (
              <div className="mt-4 rounded-[24px] border border-black/10 bg-cream-light p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-warm-gray">
                    Podgląd scenariusza
                  </p>
                  <Button
                    type="button"
                    variant={selectedRule.status === "Aktywne" ? "outline" : "default"}
                    onClick={() => toggleRule(selectedRule.id)}
                    className="rounded-full px-4 text-[11px] uppercase tracking-[0.8px]"
                  >
                    {selectedRule.status === "Aktywne" ? "Wstrzymaj" : "Aktywuj"}
                  </Button>
                </div>
                <h3 className="mt-3 text-[16px] font-medium text-charcoal">{selectedRule.name}</h3>
                <p className="mt-3 text-[13px] leading-6 text-charcoal/85">{selectedRule.preview}</p>
                <div className="mt-4 rounded-2xl bg-white p-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-warm-gray">
                    Cel upsell
                  </p>
                  <p className="mt-2 text-[13px] leading-6 text-charcoal/85">
                    {selectedRule.recommendation}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-[28px] border border-black/10 bg-white p-5">
            <div className="pb-4 border-b border-black/10">
              <h2 className="text-[12px] font-medium uppercase tracking-[0.8px] text-charcoal">
                Ostatnie powiadomienia
              </h2>
              <p className="text-[13px] text-warm-gray mt-1">
                Wszystkie wpisy są klikalne i powiązane z aktualnym zamówieniem.
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {orderNotifications.map((notification) => (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => setSelectedNotificationId(notification.id)}
                  className={cn(
                    "w-full rounded-2xl border px-4 py-4 text-left transition-colors",
                    selectedNotification.id === notification.id
                      ? "border-charcoal bg-cream-light"
                      : "border-black/10 hover:border-charcoal/40"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[14px] font-medium text-charcoal">{notification.title}</p>
                    <span className="text-[11px] text-warm-gray">{notification.sentAt}</span>
                  </div>
                  <p className="mt-2 text-[12px] text-warm-gray">
                    {notification.customer} · {notification.channel}
                  </p>
                  <p className="mt-3 text-[13px] text-charcoal/80">{notification.summary}</p>
                </button>
              ))}
            </div>

            {selectedNotification && (
              <div className="mt-4 rounded-[24px] border border-black/10 bg-cream-light p-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-warm-gray">
                  Treść wysłanego powiadomienia
                </p>
                <h3 className="mt-3 text-[16px] font-medium text-charcoal">
                  {selectedNotification.title}
                </h3>
                <p className="mt-2 text-[12px] text-warm-gray">
                  {selectedNotification.channel} · {selectedNotification.sentAt}
                </p>
                <p className="mt-4 text-[13px] leading-6 text-charcoal/85">
                  {selectedNotification.body}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
