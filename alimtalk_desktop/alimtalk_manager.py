#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
알림톡 관리 시스템 - 데스크톱 프로그램
게임 대리 서비스 시간 차감 알림 관리 도구
Python 3.x + tkinter
"""

import tkinter as tk
from tkinter import ttk, messagebox, simpledialog
import json
import os
import uuid
from datetime import datetime, date
import math

# ─── 데이터 파일 경로 ───
DATA_DIR = os.path.join(os.path.expanduser("~"), "알림톡관리_데이터")
CUSTOMERS_FILE = os.path.join(DATA_DIR, "customers.json")
RECORDS_FILE = os.path.join(DATA_DIR, "records.json")
DRIVERS_FILE = os.path.join(DATA_DIR, "drivers.json")
SETTINGS_FILE = os.path.join(DATA_DIR, "settings.json")

# ─── 기본 설정 ───
DEFAULT_SETTINGS = {
    "business_name": "리니지 학교",
    "message_template": """[{업체명}] 시간 차감 안내

안녕하세요, {고객명} 고객님!

금일 플레이가 종료되어 안내드립니다.

━━━━━━━━━━━━━━━━━━━━
  금일 플레이 시간:  {플레이시간}
  총 누적 사용 시간:  {누적시간}
  남은 이용 시간:  {남은시간}
━━━━━━━━━━━━━━━━━━━━

궁금한 점이 있으시면 언제든 문의해주세요.

감사합니다."""
}

# ─── 색상 테마 ───
COLORS = {
    "bg": "#F0F4F8",
    "sidebar_bg": "#1E293B",
    "sidebar_text": "#E2E8F0",
    "sidebar_active": "#334155",
    "sidebar_accent": "#10B981",
    "card_bg": "#FFFFFF",
    "text_dark": "#1E293B",
    "text_muted": "#64748B",
    "primary": "#3B82F6",
    "success": "#10B981",
    "warning": "#F59E0B",
    "danger": "#EF4444",
    "kakao_yellow": "#FEE500",
    "kakao_brown": "#3C1E1E",
    "kakao_chat_bg": "#B2C7D9",
    "border": "#E2E8F0",
}

# ─── 유틸리티 함수 ───
def ensure_data_dir():
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)

def load_json(filepath, default):
    try:
        if os.path.exists(filepath):
            with open(filepath, "r", encoding="utf-8") as f:
                return json.load(f)
    except:
        pass
    return default

def save_json(filepath, data):
    ensure_data_dir()
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def format_time(hours):
    h = int(hours)
    m = round((hours - h) * 60)
    if m > 0:
        return f"{h}시간 {m}분"
    return f"{h}시간"

def generate_id():
    return str(uuid.uuid4())[:8]

def format_number(n):
    return f"{n:,.0f}"


# ─── 메인 애플리케이션 ───
class AlimtalkManager(tk.Tk):
    def __init__(self):
        super().__init__()

        self.title("알림톡 관리 시스템")
        self.geometry("1200x800")
        self.minsize(1000, 700)
        self.configure(bg=COLORS["bg"])

        # 데이터 로드
        self.customers = load_json(CUSTOMERS_FILE, [])
        self.records = load_json(RECORDS_FILE, [])
        self.drivers = load_json(DRIVERS_FILE, [
            {"id": "d1", "name": "기사A", "hourly_rate": 5000},
            {"id": "d2", "name": "기사B", "hourly_rate": 6000},
        ])
        self.settings = load_json(SETTINGS_FILE, DEFAULT_SETTINGS)

        # 스타일 설정
        self.setup_styles()

        # 레이아웃
        self.create_sidebar()
        self.create_main_area()

        # 초기 화면
        self.show_dashboard()

        # 종료 시 데이터 저장
        self.protocol("WM_DELETE_WINDOW", self.on_closing)

    def setup_styles(self):
        style = ttk.Style()
        style.theme_use("clam")

        # 기본 폰트 크기 크게
        default_font = ("맑은 고딕", 13)
        large_font = ("맑은 고딕", 16, "bold")
        huge_font = ("맑은 고딕", 28, "bold")

        style.configure(".", font=default_font)
        style.configure("TLabel", font=default_font, background=COLORS["card_bg"])
        style.configure("TButton", font=default_font, padding=(12, 8))
        style.configure("TEntry", font=default_font, padding=8)

        style.configure("Title.TLabel", font=("맑은 고딕", 18, "bold"),
                        background=COLORS["card_bg"], foreground=COLORS["text_dark"])
        style.configure("Subtitle.TLabel", font=("맑은 고딕", 13),
                        background=COLORS["card_bg"], foreground=COLORS["text_muted"])
        style.configure("Huge.TLabel", font=huge_font,
                        background=COLORS["card_bg"], foreground=COLORS["text_dark"])
        style.configure("CardTitle.TLabel", font=("맑은 고딕", 14, "bold"),
                        background=COLORS["card_bg"], foreground=COLORS["text_dark"])

        # 성공 버튼
        style.configure("Success.TButton", font=("맑은 고딕", 14, "bold"),
                        background=COLORS["success"], foreground="white")
        style.map("Success.TButton",
                  background=[("active", "#059669")])

        # 카카오 버튼
        style.configure("Kakao.TButton", font=("맑은 고딕", 16, "bold"),
                        background=COLORS["kakao_yellow"], foreground=COLORS["kakao_brown"],
                        padding=(20, 14))
        style.map("Kakao.TButton",
                  background=[("active", "#FDD835")])

        # 위험 버튼
        style.configure("Danger.TButton",
                        background=COLORS["danger"], foreground="white")
        style.map("Danger.TButton",
                  background=[("active", "#DC2626")])

        # Treeview 스타일 (큰 글씨)
        style.configure("Treeview", font=("맑은 고딕", 13), rowheight=45)
        style.configure("Treeview.Heading", font=("맑은 고딕", 13, "bold"))

    def create_sidebar(self):
        self.sidebar = tk.Frame(self, bg=COLORS["sidebar_bg"], width=220)
        self.sidebar.pack(side="left", fill="y")
        self.sidebar.pack_propagate(False)

        # 로고 영역
        logo_frame = tk.Frame(self.sidebar, bg=COLORS["sidebar_bg"], height=70)
        logo_frame.pack(fill="x", pady=(0, 10))
        logo_frame.pack_propagate(False)

        icon_label = tk.Label(logo_frame, text="💬", font=("맑은 고딕", 22),
                              bg=COLORS["sidebar_bg"])
        icon_label.pack(side="left", padx=(20, 8), pady=15)

        title_frame = tk.Frame(logo_frame, bg=COLORS["sidebar_bg"])
        title_frame.pack(side="left", pady=15)
        tk.Label(title_frame, text="알림톡 관리", font=("맑은 고딕", 14, "bold"),
                 bg=COLORS["sidebar_bg"], fg="white").pack(anchor="w")
        tk.Label(title_frame, text="Giranteam", font=("맑은 고딕", 10),
                 bg=COLORS["sidebar_bg"], fg=COLORS["sidebar_text"]).pack(anchor="w")

        # 구분선
        tk.Frame(self.sidebar, bg="#334155", height=1).pack(fill="x", padx=15)

        # 네비게이션 버튼
        self.nav_buttons = {}
        nav_items = [
            ("dashboard", "📊  대시보드"),
            ("customers", "👥  고객 관리"),
            ("play_record", "⏱️  시간 차감"),
            ("messages", "📋  알림 내역"),
            ("drivers", "🔧  기사 관리"),
            ("settings", "⚙️  설정"),
        ]

        for key, label in nav_items:
            btn = tk.Button(
                self.sidebar, text=label, font=("맑은 고딕", 13),
                bg=COLORS["sidebar_bg"], fg=COLORS["sidebar_text"],
                activebackground=COLORS["sidebar_active"],
                activeforeground="white",
                bd=0, anchor="w", padx=20, pady=12,
                cursor="hand2",
                command=lambda k=key: self.navigate(k)
            )
            btn.pack(fill="x", padx=8, pady=2)
            btn.bind("<Enter>", lambda e, b=btn: b.configure(bg=COLORS["sidebar_active"]))
            btn.bind("<Leave>", lambda e, b=btn, k=key: b.configure(
                bg=COLORS["sidebar_active"] if self.current_page == k else COLORS["sidebar_bg"]))
            self.nav_buttons[key] = btn

        self.current_page = "dashboard"

    def create_main_area(self):
        self.main_area = tk.Frame(self, bg=COLORS["bg"])
        self.main_area.pack(side="left", fill="both", expand=True)

        # 스크롤 가능한 메인 컨텐츠
        self.canvas = tk.Canvas(self.main_area, bg=COLORS["bg"], highlightthickness=0)
        self.scrollbar = ttk.Scrollbar(self.main_area, orient="vertical", command=self.canvas.yview)
        self.content_frame = tk.Frame(self.canvas, bg=COLORS["bg"])

        self.content_frame.bind("<Configure>",
            lambda e: self.canvas.configure(scrollregion=self.canvas.bbox("all")))

        self.canvas_window = self.canvas.create_window((0, 0), window=self.content_frame, anchor="nw")
        self.canvas.configure(yscrollcommand=self.scrollbar.set)

        self.canvas.pack(side="left", fill="both", expand=True)
        self.scrollbar.pack(side="right", fill="y")

        # 캔버스 크기에 맞춰 content_frame 너비 조정
        self.canvas.bind("<Configure>", self._on_canvas_configure)

        # 마우스 휠 스크롤
        self.canvas.bind_all("<MouseWheel>",
            lambda e: self.canvas.yview_scroll(int(-1 * (e.delta / 120)), "units"))

    def _on_canvas_configure(self, event):
        self.canvas.itemconfig(self.canvas_window, width=event.width)

    def navigate(self, page):
        self.current_page = page
        # 사이드바 활성 상태 업데이트
        for key, btn in self.nav_buttons.items():
            if key == page:
                btn.configure(bg=COLORS["sidebar_active"])
            else:
                btn.configure(bg=COLORS["sidebar_bg"])

        pages = {
            "dashboard": self.show_dashboard,
            "customers": self.show_customers,
            "play_record": self.show_play_record,
            "messages": self.show_messages,
            "drivers": self.show_drivers,
            "settings": self.show_settings,
        }
        pages.get(page, self.show_dashboard)()

    def clear_content(self):
        for widget in self.content_frame.winfo_children():
            widget.destroy()
        self.canvas.yview_moveto(0)

    def create_card(self, parent, **kwargs):
        card = tk.Frame(parent, bg=COLORS["card_bg"], bd=0,
                        highlightbackground=COLORS["border"], highlightthickness=1)
        if kwargs.get("padx"):
            card.pack(fill="x", padx=kwargs["padx"], pady=kwargs.get("pady", 5))
        return card

    # ─── 대시보드 ───
    def show_dashboard(self):
        self.clear_content()
        pad = 30

        # 헤더
        header = tk.Frame(self.content_frame, bg=COLORS["sidebar_bg"], height=120)
        header.pack(fill="x", padx=pad, pady=(pad, 15))
        header.pack_propagate(False)

        tk.Label(header, text="알림톡 관리 시스템", font=("맑은 고딕", 22, "bold"),
                 bg=COLORS["sidebar_bg"], fg="white").pack(anchor="w", padx=25, pady=(20, 2))
        tk.Label(header, text="고객 시간 관리 및 카카오톡 알림 메시지를 한곳에서 관리하세요",
                 font=("맑은 고딕", 12), bg=COLORS["sidebar_bg"], fg=COLORS["sidebar_text"]
                 ).pack(anchor="w", padx=25)

        btn_frame = tk.Frame(header, bg=COLORS["sidebar_bg"])
        btn_frame.pack(anchor="w", padx=25, pady=(8, 0))
        tk.Button(btn_frame, text="＋ 시간 차감 등록", font=("맑은 고딕", 12, "bold"),
                  bg=COLORS["success"], fg="white", bd=0, padx=15, pady=6,
                  cursor="hand2", command=lambda: self.navigate("play_record")).pack()

        # 요약 카드
        cards_frame = tk.Frame(self.content_frame, bg=COLORS["bg"])
        cards_frame.pack(fill="x", padx=pad, pady=(0, 15))

        today = date.today().isoformat()
        total_customers = len(self.customers)
        today_deductions = len([r for r in self.records if r.get("date") == today])
        pending = len([r for r in self.records if not r.get("message_sent", False)])
        total_remaining = sum(
            max(0, c.get("total_hours", 0) - c.get("used_hours", 0))
            for c in self.customers
        )

        summary_data = [
            ("👥", "총 고객 수", total_customers, "명", COLORS["primary"]),
            ("⏱️", "오늘 차감", today_deductions, "건", COLORS["success"]),
            ("⚠️", "미발송 알림", pending, "건", COLORS["warning"]),
            ("⏰", "총 잔여 시간", total_remaining, "시간", "#8B5CF6"),
        ]

        for i, (icon, label, value, unit, color) in enumerate(summary_data):
            cards_frame.columnconfigure(i, weight=1, uniform="card")

            card = tk.Frame(cards_frame, bg=COLORS["card_bg"],
                            highlightbackground=COLORS["border"], highlightthickness=1)
            card.grid(row=0, column=i, padx=5, pady=5, sticky="nsew")

            inner = tk.Frame(card, bg=COLORS["card_bg"])
            inner.pack(fill="both", padx=18, pady=15)

            tk.Label(inner, text=label, font=("맑은 고딕", 11),
                     bg=COLORS["card_bg"], fg=COLORS["text_muted"]).pack(anchor="w")

            val_frame = tk.Frame(inner, bg=COLORS["card_bg"])
            val_frame.pack(anchor="w", pady=(5, 0))
            tk.Label(val_frame, text=str(value), font=("맑은 고딕", 32, "bold"),
                     bg=COLORS["card_bg"], fg=COLORS["text_dark"]).pack(side="left")
            tk.Label(val_frame, text=f" {unit}", font=("맑은 고딕", 14),
                     bg=COLORS["card_bg"], fg=COLORS["text_muted"]).pack(side="left", pady=(12, 0))

        # 최근 차감 내역
        recent_frame = tk.Frame(self.content_frame, bg=COLORS["card_bg"],
                                highlightbackground=COLORS["border"], highlightthickness=1)
        recent_frame.pack(fill="x", padx=pad, pady=(0, 15))

        tk.Label(recent_frame, text="📋 최근 차감 내역", font=("맑은 고딕", 15, "bold"),
                 bg=COLORS["card_bg"], fg=COLORS["text_dark"]).pack(anchor="w", padx=20, pady=(15, 10))

        recent_records = sorted(self.records, key=lambda r: r.get("created_at", ""), reverse=True)[:5]

        if not recent_records:
            tk.Label(recent_frame, text="차감 내역이 없습니다", font=("맑은 고딕", 13),
                     bg=COLORS["card_bg"], fg=COLORS["text_muted"]).pack(pady=20)
        else:
            for r in recent_records:
                row = tk.Frame(recent_frame, bg=COLORS["bg"])
                row.pack(fill="x", padx=15, pady=3)

                left = tk.Frame(row, bg=COLORS["bg"])
                left.pack(side="left", fill="x", expand=True)

                name_label = tk.Label(left, text=r.get("customer_name", ""),
                                      font=("맑은 고딕", 13, "bold"),
                                      bg=COLORS["bg"], fg=COLORS["text_dark"])
                name_label.pack(side="left", padx=(10, 5))

                info = f"{r.get('date', '')} · {r.get('driver_name', '')}"
                tk.Label(left, text=info, font=("맑은 고딕", 11),
                         bg=COLORS["bg"], fg=COLORS["text_muted"]).pack(side="left")

                right = tk.Frame(row, bg=COLORS["bg"])
                right.pack(side="right")

                hours_text = f"-{r.get('play_hours', 0)}h"
                tk.Label(right, text=hours_text, font=("맑은 고딕", 14, "bold"),
                         bg=COLORS["bg"], fg=COLORS["text_dark"]).pack(side="left", padx=(0, 10))

                sent = r.get("message_sent", False)
                status_text = "발송완료" if sent else "미발송"
                status_color = COLORS["success"] if sent else COLORS["warning"]
                tk.Label(right, text=status_text, font=("맑은 고딕", 11, "bold"),
                         bg=status_color, fg="white", padx=8, pady=2).pack(side="left")

        tk.Frame(recent_frame, bg=COLORS["card_bg"], height=10).pack()

    # ─── 고객 관리 ───
    def show_customers(self):
        self.clear_content()
        pad = 30

        # 헤더
        header = tk.Frame(self.content_frame, bg=COLORS["bg"])
        header.pack(fill="x", padx=pad, pady=(pad, 15))

        tk.Label(header, text="👥 고객 관리", font=("맑은 고딕", 20, "bold"),
                 bg=COLORS["bg"], fg=COLORS["text_dark"]).pack(side="left")

        tk.Button(header, text="＋ 고객 등록", font=("맑은 고딕", 13, "bold"),
                  bg=COLORS["success"], fg="white", bd=0, padx=15, pady=8,
                  cursor="hand2", command=self.add_customer_dialog).pack(side="right")

        # 고객 카드 목록
        for c in self.customers:
            remaining = c.get("total_hours", 0) - c.get("used_hours", 0)
            pct = (c.get("used_hours", 0) / max(c.get("total_hours", 1), 1)) * 100

            card = tk.Frame(self.content_frame, bg=COLORS["card_bg"],
                            highlightbackground=COLORS["border"], highlightthickness=1)
            card.pack(fill="x", padx=pad, pady=4)

            inner = tk.Frame(card, bg=COLORS["card_bg"])
            inner.pack(fill="x", padx=20, pady=15)

            # 상단: 이름 + 버튼
            top = tk.Frame(inner, bg=COLORS["card_bg"])
            top.pack(fill="x")

            tk.Label(top, text=c.get("name", ""), font=("맑은 고딕", 16, "bold"),
                     bg=COLORS["card_bg"], fg=COLORS["text_dark"]).pack(side="left")

            tk.Label(top, text=c.get("phone", ""), font=("맑은 고딕", 12),
                     bg=COLORS["card_bg"], fg=COLORS["text_muted"]).pack(side="left", padx=(10, 0))

            # 상태 뱃지
            if remaining <= 5:
                tk.Label(top, text=" 긴급 ", font=("맑은 고딕", 11, "bold"),
                         bg=COLORS["danger"], fg="white", padx=6, pady=1).pack(side="left", padx=(10, 0))
            elif remaining <= 10:
                tk.Label(top, text=" 주의 ", font=("맑은 고딕", 11, "bold"),
                         bg=COLORS["warning"], fg="white", padx=6, pady=1).pack(side="left", padx=(10, 0))

            btn_frame = tk.Frame(top, bg=COLORS["card_bg"])
            btn_frame.pack(side="right")

            tk.Button(btn_frame, text="수정", font=("맑은 고딕", 11),
                      bg=COLORS["primary"], fg="white", bd=0, padx=10, pady=4,
                      cursor="hand2",
                      command=lambda cid=c["id"]: self.edit_customer_dialog(cid)).pack(side="left", padx=3)
            tk.Button(btn_frame, text="삭제", font=("맑은 고딕", 11),
                      bg=COLORS["danger"], fg="white", bd=0, padx=10, pady=4,
                      cursor="hand2",
                      command=lambda cid=c["id"]: self.delete_customer(cid)).pack(side="left", padx=3)

            # 시간 게이지
            gauge_frame = tk.Frame(inner, bg=COLORS["card_bg"])
            gauge_frame.pack(fill="x", pady=(10, 0))

            info_text = f"사용 {c.get('used_hours', 0)}시간 / 총 {c.get('total_hours', 0)}시간"
            tk.Label(gauge_frame, text=info_text, font=("맑은 고딕", 12),
                     bg=COLORS["card_bg"], fg=COLORS["text_muted"]).pack(anchor="w")

            # 프로그레스 바
            bar_bg = tk.Frame(gauge_frame, bg="#E2E8F0", height=14)
            bar_bg.pack(fill="x", pady=(5, 0))

            bar_color = COLORS["danger"] if remaining <= 5 else (COLORS["warning"] if remaining <= 10 else COLORS["success"])
            bar_width = min(pct, 100)
            bar_fill = tk.Frame(bar_bg, bg=bar_color, height=14)
            bar_fill.place(relwidth=bar_width / 100, relheight=1)

            # 남은 시간
            remain_frame = tk.Frame(inner, bg="#F0F4F8")
            remain_frame.pack(fill="x", pady=(10, 0))

            tk.Label(remain_frame, text="남은 시간", font=("맑은 고딕", 12),
                     bg="#F0F4F8", fg=COLORS["text_muted"]).pack(side="left", padx=15, pady=10)

            remain_color = COLORS["danger"] if remaining <= 5 else (COLORS["warning"] if remaining <= 10 else COLORS["success"])
            tk.Label(remain_frame, text=f"{remaining}시간", font=("맑은 고딕", 22, "bold"),
                     bg="#F0F4F8", fg=remain_color).pack(side="right", padx=15, pady=10)

    def add_customer_dialog(self):
        self._customer_dialog(None)

    def edit_customer_dialog(self, customer_id):
        customer = next((c for c in self.customers if c["id"] == customer_id), None)
        if customer:
            self._customer_dialog(customer)

    def _customer_dialog(self, customer):
        dialog = tk.Toplevel(self)
        dialog.title("고객 등록" if not customer else "고객 수정")
        dialog.geometry("450x550")
        dialog.configure(bg=COLORS["card_bg"])
        dialog.transient(self)
        dialog.grab_set()

        # 중앙 배치
        dialog.update_idletasks()
        x = self.winfo_x() + (self.winfo_width() - 450) // 2
        y = self.winfo_y() + (self.winfo_height() - 550) // 2
        dialog.geometry(f"+{x}+{y}")

        tk.Label(dialog, text="고객 등록" if not customer else "고객 수정",
                 font=("맑은 고딕", 18, "bold"), bg=COLORS["card_bg"]).pack(pady=(20, 15))

        form = tk.Frame(dialog, bg=COLORS["card_bg"])
        form.pack(fill="x", padx=30)

        fields = [
            ("고객명 *", "name", customer.get("name", "") if customer else ""),
            ("전화번호", "phone", customer.get("phone", "") if customer else ""),
            ("게임명", "game_name", customer.get("game_name", "리니지") if customer else "리니지"),
            ("총 구매 시간", "total_hours", str(customer.get("total_hours", 0)) if customer else "0"),
            ("사용 시간", "used_hours", str(customer.get("used_hours", 0)) if customer else "0"),
            ("메모", "memo", customer.get("memo", "") if customer else ""),
        ]

        entries = {}
        for label_text, key, default in fields:
            tk.Label(form, text=label_text, font=("맑은 고딕", 12, "bold"),
                     bg=COLORS["card_bg"]).pack(anchor="w", pady=(10, 3))
            entry = tk.Entry(form, font=("맑은 고딕", 14), bd=1, relief="solid")
            entry.pack(fill="x", ipady=5)
            entry.insert(0, default)
            entries[key] = entry

        def save():
            name = entries["name"].get().strip()
            if not name:
                messagebox.showerror("오류", "고객명을 입력해주세요", parent=dialog)
                return

            data = {
                "name": name,
                "phone": entries["phone"].get().strip(),
                "game_name": entries["game_name"].get().strip() or "리니지",
                "total_hours": float(entries["total_hours"].get() or 0),
                "used_hours": float(entries["used_hours"].get() or 0),
                "memo": entries["memo"].get().strip(),
            }

            if customer:
                for c in self.customers:
                    if c["id"] == customer["id"]:
                        c.update(data)
                        break
            else:
                data["id"] = generate_id()
                data["created_at"] = datetime.now().isoformat()
                self.customers.append(data)

            save_json(CUSTOMERS_FILE, self.customers)
            dialog.destroy()
            self.show_customers()

        btn_frame = tk.Frame(dialog, bg=COLORS["card_bg"])
        btn_frame.pack(fill="x", padx=30, pady=20)

        tk.Button(btn_frame, text="취소", font=("맑은 고딕", 13),
                  bg=COLORS["border"], fg=COLORS["text_dark"], bd=0, padx=20, pady=8,
                  command=dialog.destroy).pack(side="left")
        tk.Button(btn_frame, text="저장", font=("맑은 고딕", 13, "bold"),
                  bg=COLORS["success"], fg="white", bd=0, padx=20, pady=8,
                  command=save).pack(side="right")

    def delete_customer(self, customer_id):
        if messagebox.askyesno("확인", "정말로 이 고객을 삭제하시겠습니까?"):
            self.customers = [c for c in self.customers if c["id"] != customer_id]
            save_json(CUSTOMERS_FILE, self.customers)
            self.show_customers()

    # ─── 시간 차감 등록 ───
    def show_play_record(self):
        self.clear_content()
        pad = 30

        # 헤더
        tk.Label(self.content_frame, text="⏱️ 시간 차감 등록",
                 font=("맑은 고딕", 20, "bold"),
                 bg=COLORS["bg"], fg=COLORS["text_dark"]).pack(anchor="w", padx=pad, pady=(pad, 5))
        tk.Label(self.content_frame, text="기사의 플레이 시간을 입력하고 고객에게 알림 메시지를 생성합니다",
                 font=("맑은 고딕", 12), bg=COLORS["bg"], fg=COLORS["text_muted"]
                 ).pack(anchor="w", padx=pad, pady=(0, 15))

        # 2컬럼 레이아웃
        columns = tk.Frame(self.content_frame, bg=COLORS["bg"])
        columns.pack(fill="both", padx=pad, expand=True)
        columns.columnconfigure(0, weight=1)
        columns.columnconfigure(1, weight=1)

        # 왼쪽: 입력 폼
        left_card = tk.Frame(columns, bg=COLORS["card_bg"],
                             highlightbackground=COLORS["border"], highlightthickness=1)
        left_card.grid(row=0, column=0, padx=(0, 10), pady=5, sticky="nsew")

        form = tk.Frame(left_card, bg=COLORS["card_bg"])
        form.pack(fill="x", padx=25, pady=20)

        tk.Label(form, text="차감 정보 입력", font=("맑은 고딕", 15, "bold"),
                 bg=COLORS["card_bg"]).pack(anchor="w", pady=(0, 15))

        # 고객 선택
        tk.Label(form, text="고객 선택 *", font=("맑은 고딕", 13, "bold"),
                 bg=COLORS["card_bg"]).pack(anchor="w", pady=(0, 5))

        customer_names = [f"{c['name']} (남은 {c['total_hours'] - c['used_hours']}시간)" for c in self.customers]
        self.customer_var = tk.StringVar()
        customer_combo = ttk.Combobox(form, textvariable=self.customer_var,
                                       values=customer_names, state="readonly",
                                       font=("맑은 고딕", 14))
        customer_combo.pack(fill="x", ipady=5, pady=(0, 10))

        # 기사 선택
        tk.Label(form, text="기사 선택 *", font=("맑은 고딕", 13, "bold"),
                 bg=COLORS["card_bg"]).pack(anchor="w", pady=(0, 5))

        driver_names = [f"{d['name']} (시급 {format_number(d['hourly_rate'])}원)" for d in self.drivers]
        self.driver_var = tk.StringVar()
        driver_combo = ttk.Combobox(form, textvariable=self.driver_var,
                                     values=driver_names, state="readonly",
                                     font=("맑은 고딕", 14))
        driver_combo.pack(fill="x", ipady=5, pady=(0, 10))

        # 플레이 시간
        tk.Label(form, text="플레이 시간 *", font=("맑은 고딕", 13, "bold"),
                 bg=COLORS["card_bg"]).pack(anchor="w", pady=(0, 5))

        time_frame = tk.Frame(form, bg=COLORS["card_bg"])
        time_frame.pack(fill="x", pady=(0, 10))

        self.hours_var = tk.StringVar(value="0")
        hours_entry = tk.Entry(time_frame, textvariable=self.hours_var,
                               font=("맑은 고딕", 20, "bold"), width=5, justify="center",
                               bd=1, relief="solid")
        hours_entry.pack(side="left", ipady=8)
        tk.Label(time_frame, text="시간", font=("맑은 고딕", 14),
                 bg=COLORS["card_bg"]).pack(side="left", padx=(5, 20))

        self.minutes_var = tk.StringVar(value="0")
        minutes_entry = tk.Entry(time_frame, textvariable=self.minutes_var,
                                  font=("맑은 고딕", 20, "bold"), width=5, justify="center",
                                  bd=1, relief="solid")
        minutes_entry.pack(side="left", ipady=8)
        tk.Label(time_frame, text="분", font=("맑은 고딕", 14),
                 bg=COLORS["card_bg"]).pack(side="left", padx=5)

        # 버튼
        btn_frame = tk.Frame(form, bg=COLORS["card_bg"])
        btn_frame.pack(fill="x", pady=(15, 0))

        tk.Button(btn_frame, text="✈️  차감 등록", font=("맑은 고딕", 15, "bold"),
                  bg=COLORS["success"], fg="white", bd=0, padx=20, pady=12,
                  cursor="hand2", command=self._submit_play_record).pack(fill="x")

        # 오른쪽: 카카오톡 미리보기
        right_card = tk.Frame(columns, bg=COLORS["card_bg"],
                              highlightbackground=COLORS["border"], highlightthickness=1)
        right_card.grid(row=0, column=1, padx=(10, 0), pady=5, sticky="nsew")

        # 카카오 헤더
        kakao_header = tk.Frame(right_card, bg=COLORS["kakao_yellow"], height=45)
        kakao_header.pack(fill="x")
        kakao_header.pack_propagate(False)
        tk.Label(kakao_header, text="💬 카카오톡 메시지 미리보기",
                 font=("맑은 고딕", 13, "bold"),
                 bg=COLORS["kakao_yellow"], fg=COLORS["kakao_brown"]).pack(side="left", padx=15, pady=10)

        # 채팅 배경
        self.chat_bg = tk.Frame(right_card, bg=COLORS["kakao_chat_bg"])
        self.chat_bg.pack(fill="both", expand=True, padx=0, pady=0)

        self.preview_label = tk.Label(self.chat_bg, text="고객과 시간을 입력하면\n미리보기가 표시됩니다",
                                       font=("맑은 고딕", 13),
                                       bg=COLORS["kakao_chat_bg"], fg="#64748B",
                                       justify="center")
        self.preview_label.pack(expand=True)

        # 복사 버튼 영역
        self.copy_frame = tk.Frame(right_card, bg=COLORS["card_bg"])
        self.copy_frame.pack(fill="x")

        self.copy_btn = tk.Button(self.copy_frame, text="📋  메시지 복사하기",
                                   font=("맑은 고딕", 16, "bold"),
                                   bg=COLORS["kakao_yellow"], fg=COLORS["kakao_brown"],
                                   bd=0, pady=14, cursor="hand2",
                                   command=self._copy_message)
        self.copy_btn.pack(fill="x", padx=15, pady=10)

        tk.Label(self.copy_frame, text="복사 후 카카오톡에 붙여넣기 하세요",
                 font=("맑은 고딕", 10), bg=COLORS["card_bg"],
                 fg=COLORS["text_muted"]).pack(pady=(0, 10))

        # 미리보기 업데이트 바인딩
        for var in [self.customer_var, self.driver_var, self.hours_var, self.minutes_var]:
            var.trace_add("write", lambda *args: self._update_preview())

    def _get_play_hours(self):
        try:
            h = float(self.hours_var.get() or 0)
        except ValueError:
            h = 0
        try:
            m = float(self.minutes_var.get() or 0)
        except ValueError:
            m = 0
        return h + m / 60

    def _get_selected_customer(self):
        idx = None
        customer_val = self.customer_var.get()
        for i, c in enumerate(self.customers):
            display = f"{c['name']} (남은 {c['total_hours'] - c['used_hours']}시간)"
            if display == customer_val:
                idx = i
                break
        if idx is not None:
            return self.customers[idx]
        return None

    def _get_selected_driver(self):
        driver_val = self.driver_var.get()
        for d in self.drivers:
            display = f"{d['name']} (시급 {format_number(d['hourly_rate'])}원)"
            if display == driver_val:
                return d
        return None

    def _generate_preview_message(self, customer, play_hours):
        remaining = customer["total_hours"] - customer["used_hours"] - play_hours
        new_used = customer["used_hours"] + play_hours

        msg = self.settings["message_template"]
        msg = msg.replace("{업체명}", self.settings["business_name"])
        msg = msg.replace("{고객명}", customer["name"])
        msg = msg.replace("{플레이시간}", format_time(play_hours))
        msg = msg.replace("{누적시간}", format_time(new_used))
        msg = msg.replace("{남은시간}", format_time(remaining))
        return msg

    def _update_preview(self):
        customer = self._get_selected_customer()
        play_hours = self._get_play_hours()

        if customer and play_hours > 0:
            msg = self._generate_preview_message(customer, play_hours)
            # 미리보기 업데이트
            for w in self.chat_bg.winfo_children():
                w.destroy()

            # 말풍선 스타일
            bubble_frame = tk.Frame(self.chat_bg, bg=COLORS["kakao_chat_bg"])
            bubble_frame.pack(anchor="w", padx=15, pady=15)

            tk.Label(bubble_frame, text=self.settings["business_name"],
                     font=("맑은 고딕", 11), bg=COLORS["kakao_chat_bg"],
                     fg="#475569").pack(anchor="w", padx=5, pady=(0, 3))

            bubble = tk.Frame(bubble_frame, bg="white", bd=0)
            bubble.pack(anchor="w")

            msg_label = tk.Label(bubble, text=msg, font=("맑은 고딕", 12),
                                  bg="white", fg="#1E293B", justify="left",
                                  wraplength=350, padx=15, pady=12)
            msg_label.pack()

            self._current_message = msg
        else:
            for w in self.chat_bg.winfo_children():
                w.destroy()
            tk.Label(self.chat_bg, text="고객과 시간을 입력하면\n미리보기가 표시됩니다",
                     font=("맑은 고딕", 13), bg=COLORS["kakao_chat_bg"],
                     fg="#64748B", justify="center").pack(expand=True)
            self._current_message = ""

    def _copy_message(self):
        msg = getattr(self, "_current_message", "")
        if not msg:
            messagebox.showinfo("알림", "먼저 고객과 시간을 입력해주세요")
            return

        self.clipboard_clear()
        self.clipboard_append(msg)
        self.update()

        # 버튼 텍스트 변경
        self.copy_btn.configure(text="✅  복사 완료!", bg=COLORS["success"], fg="white")
        self.after(2000, lambda: self.copy_btn.configure(
            text="📋  메시지 복사하기", bg=COLORS["kakao_yellow"], fg=COLORS["kakao_brown"]))

        messagebox.showinfo("복사 완료", "메시지가 클립보드에 복사되었습니다.\n카카오톡에 붙여넣기(Ctrl+V) 하세요!")

    def _submit_play_record(self):
        customer = self._get_selected_customer()
        driver = self._get_selected_driver()
        play_hours = self._get_play_hours()

        if not customer:
            messagebox.showerror("오류", "고객을 선택해주세요")
            return
        if not driver:
            messagebox.showerror("오류", "기사를 선택해주세요")
            return
        if play_hours <= 0:
            messagebox.showerror("오류", "플레이 시간을 입력해주세요")
            return

        # 기록 생성
        record = {
            "id": generate_id(),
            "customer_id": customer["id"],
            "customer_name": customer["name"],
            "driver_name": driver["name"],
            "play_hours": play_hours,
            "hourly_rate": driver["hourly_rate"],
            "total_pay": round(play_hours * driver["hourly_rate"]),
            "date": date.today().isoformat(),
            "message_sent": False,
            "created_at": datetime.now().isoformat(),
        }
        self.records.append(record)

        # 고객 시간 차감
        for c in self.customers:
            if c["id"] == customer["id"]:
                c["used_hours"] = c.get("used_hours", 0) + play_hours
                break

        save_json(RECORDS_FILE, self.records)
        save_json(CUSTOMERS_FILE, self.customers)

        # 메시지 생성 및 복사
        msg = self._generate_preview_message(customer, play_hours)
        self.clipboard_clear()
        self.clipboard_append(msg)
        self.update()

        # 발송 완료 표시
        record["message_sent"] = True
        save_json(RECORDS_FILE, self.records)

        settlement = format_number(record["total_pay"])
        messagebox.showinfo("등록 완료",
            f"시간 차감이 등록되었습니다!\n\n"
            f"고객: {customer['name']}\n"
            f"플레이: {format_time(play_hours)}\n"
            f"기사 정산: {settlement}원\n\n"
            f"📋 메시지가 클립보드에 복사되었습니다.\n"
            f"카카오톡에 붙여넣기(Ctrl+V) 하세요!")

        self.show_play_record()

    # ─── 알림 내역 ───
    def show_messages(self):
        self.clear_content()
        pad = 30

        tk.Label(self.content_frame, text="📋 알림 내역",
                 font=("맑은 고딕", 20, "bold"),
                 bg=COLORS["bg"], fg=COLORS["text_dark"]).pack(anchor="w", padx=pad, pady=(pad, 5))
        tk.Label(self.content_frame, text=f"총 {len(self.records)}건의 차감 기록이 있습니다",
                 font=("맑은 고딕", 12), bg=COLORS["bg"], fg=COLORS["text_muted"]
                 ).pack(anchor="w", padx=pad, pady=(0, 15))

        sorted_records = sorted(self.records, key=lambda r: r.get("created_at", ""), reverse=True)

        for r in sorted_records:
            card = tk.Frame(self.content_frame, bg=COLORS["card_bg"],
                            highlightbackground=COLORS["border"], highlightthickness=1)
            card.pack(fill="x", padx=pad, pady=3)

            inner = tk.Frame(card, bg=COLORS["card_bg"])
            inner.pack(fill="x", padx=20, pady=12)

            # 왼쪽 정보
            left = tk.Frame(inner, bg=COLORS["card_bg"])
            left.pack(side="left", fill="x", expand=True)

            name_frame = tk.Frame(left, bg=COLORS["card_bg"])
            name_frame.pack(anchor="w")

            tk.Label(name_frame, text=r.get("customer_name", ""),
                     font=("맑은 고딕", 15, "bold"),
                     bg=COLORS["card_bg"], fg=COLORS["text_dark"]).pack(side="left")

            sent = r.get("message_sent", False)
            status_text = "발송완료" if sent else "미발송"
            status_color = COLORS["success"] if sent else COLORS["warning"]
            tk.Label(name_frame, text=f" {status_text} ", font=("맑은 고딕", 10, "bold"),
                     bg=status_color, fg="white", padx=6, pady=1).pack(side="left", padx=(8, 0))

            info = f"{r.get('date', '')} · {r.get('driver_name', '')} · 정산 {format_number(r.get('total_pay', 0))}원"
            tk.Label(left, text=info, font=("맑은 고딕", 11),
                     bg=COLORS["card_bg"], fg=COLORS["text_muted"]).pack(anchor="w", pady=(3, 0))

            # 오른쪽: 시간 + 복사 버튼
            right = tk.Frame(inner, bg=COLORS["card_bg"])
            right.pack(side="right")

            tk.Label(right, text=f"{r.get('play_hours', 0)}시간",
                     font=("맑은 고딕", 18, "bold"),
                     bg=COLORS["card_bg"], fg=COLORS["primary"]).pack(side="left", padx=(0, 15))

            tk.Button(right, text="복사", font=("맑은 고딕", 12, "bold"),
                      bg=COLORS["kakao_yellow"], fg=COLORS["kakao_brown"],
                      bd=0, padx=12, pady=5, cursor="hand2",
                      command=lambda rec=r: self._copy_record_message(rec)).pack(side="left")

        if not self.records:
            tk.Label(self.content_frame, text="알림 내역이 없습니다",
                     font=("맑은 고딕", 14), bg=COLORS["bg"],
                     fg=COLORS["text_muted"]).pack(pady=40)

    def _copy_record_message(self, record):
        customer = next((c for c in self.customers if c["id"] == record.get("customer_id")), None)
        if not customer:
            messagebox.showerror("오류", "고객 정보를 찾을 수 없습니다")
            return

        msg = self._generate_preview_message(customer, record["play_hours"])
        self.clipboard_clear()
        self.clipboard_append(msg)
        self.update()

        # 발송 완료 표시
        for r in self.records:
            if r["id"] == record["id"]:
                r["message_sent"] = True
                break
        save_json(RECORDS_FILE, self.records)

        messagebox.showinfo("복사 완료", "메시지가 클립보드에 복사되었습니다.\n카카오톡에 붙여넣기(Ctrl+V) 하세요!")
        self.show_messages()

    # ─── 기사 관리 ───
    def show_drivers(self):
        self.clear_content()
        pad = 30

        header = tk.Frame(self.content_frame, bg=COLORS["bg"])
        header.pack(fill="x", padx=pad, pady=(pad, 15))

        tk.Label(header, text="🔧 기사 관리", font=("맑은 고딕", 20, "bold"),
                 bg=COLORS["bg"], fg=COLORS["text_dark"]).pack(side="left")

        tk.Button(header, text="＋ 기사 등록", font=("맑은 고딕", 13, "bold"),
                  bg=COLORS["success"], fg="white", bd=0, padx=15, pady=8,
                  cursor="hand2", command=self._add_driver_dialog).pack(side="right")

        for d in self.drivers:
            card = tk.Frame(self.content_frame, bg=COLORS["card_bg"],
                            highlightbackground=COLORS["border"], highlightthickness=1)
            card.pack(fill="x", padx=pad, pady=4)

            inner = tk.Frame(card, bg=COLORS["card_bg"])
            inner.pack(fill="x", padx=20, pady=15)

            tk.Label(inner, text=d["name"], font=("맑은 고딕", 16, "bold"),
                     bg=COLORS["card_bg"], fg=COLORS["text_dark"]).pack(side="left")

            tk.Label(inner, text=f"시급 {format_number(d['hourly_rate'])}원",
                     font=("맑은 고딕", 14),
                     bg=COLORS["card_bg"], fg=COLORS["text_muted"]).pack(side="left", padx=(15, 0))

            btn_frame = tk.Frame(inner, bg=COLORS["card_bg"])
            btn_frame.pack(side="right")

            tk.Button(btn_frame, text="수정", font=("맑은 고딕", 11),
                      bg=COLORS["primary"], fg="white", bd=0, padx=10, pady=4,
                      cursor="hand2",
                      command=lambda did=d["id"]: self._edit_driver_dialog(did)).pack(side="left", padx=3)
            tk.Button(btn_frame, text="삭제", font=("맑은 고딕", 11),
                      bg=COLORS["danger"], fg="white", bd=0, padx=10, pady=4,
                      cursor="hand2",
                      command=lambda did=d["id"]: self._delete_driver(did)).pack(side="left", padx=3)

    def _add_driver_dialog(self):
        self._driver_dialog(None)

    def _edit_driver_dialog(self, driver_id):
        driver = next((d for d in self.drivers if d["id"] == driver_id), None)
        if driver:
            self._driver_dialog(driver)

    def _driver_dialog(self, driver):
        dialog = tk.Toplevel(self)
        dialog.title("기사 등록" if not driver else "기사 수정")
        dialog.geometry("400x300")
        dialog.configure(bg=COLORS["card_bg"])
        dialog.transient(self)
        dialog.grab_set()

        dialog.update_idletasks()
        x = self.winfo_x() + (self.winfo_width() - 400) // 2
        y = self.winfo_y() + (self.winfo_height() - 300) // 2
        dialog.geometry(f"+{x}+{y}")

        tk.Label(dialog, text="기사 등록" if not driver else "기사 수정",
                 font=("맑은 고딕", 18, "bold"), bg=COLORS["card_bg"]).pack(pady=(20, 15))

        form = tk.Frame(dialog, bg=COLORS["card_bg"])
        form.pack(fill="x", padx=30)

        tk.Label(form, text="기사명 *", font=("맑은 고딕", 13, "bold"),
                 bg=COLORS["card_bg"]).pack(anchor="w", pady=(0, 5))
        name_entry = tk.Entry(form, font=("맑은 고딕", 14), bd=1, relief="solid")
        name_entry.pack(fill="x", ipady=5)
        if driver:
            name_entry.insert(0, driver["name"])

        tk.Label(form, text="시간당 단가 (원)", font=("맑은 고딕", 13, "bold"),
                 bg=COLORS["card_bg"]).pack(anchor="w", pady=(15, 5))
        rate_entry = tk.Entry(form, font=("맑은 고딕", 14), bd=1, relief="solid")
        rate_entry.pack(fill="x", ipady=5)
        rate_entry.insert(0, str(driver["hourly_rate"]) if driver else "5000")

        def save():
            name = name_entry.get().strip()
            if not name:
                messagebox.showerror("오류", "기사명을 입력해주세요", parent=dialog)
                return
            rate = float(rate_entry.get() or 5000)

            if driver:
                for d in self.drivers:
                    if d["id"] == driver["id"]:
                        d["name"] = name
                        d["hourly_rate"] = rate
                        break
            else:
                self.drivers.append({"id": generate_id(), "name": name, "hourly_rate": rate})

            save_json(DRIVERS_FILE, self.drivers)
            dialog.destroy()
            self.show_drivers()

        btn_frame = tk.Frame(dialog, bg=COLORS["card_bg"])
        btn_frame.pack(fill="x", padx=30, pady=20)

        tk.Button(btn_frame, text="취소", font=("맑은 고딕", 13),
                  bg=COLORS["border"], fg=COLORS["text_dark"], bd=0, padx=20, pady=8,
                  command=dialog.destroy).pack(side="left")
        tk.Button(btn_frame, text="저장", font=("맑은 고딕", 13, "bold"),
                  bg=COLORS["success"], fg="white", bd=0, padx=20, pady=8,
                  command=save).pack(side="right")

    def _delete_driver(self, driver_id):
        if messagebox.askyesno("확인", "정말로 이 기사를 삭제하시겠습니까?"):
            self.drivers = [d for d in self.drivers if d["id"] != driver_id]
            save_json(DRIVERS_FILE, self.drivers)
            self.show_drivers()

    # ─── 설정 ───
    def show_settings(self):
        self.clear_content()
        pad = 30

        tk.Label(self.content_frame, text="⚙️ 설정",
                 font=("맑은 고딕", 20, "bold"),
                 bg=COLORS["bg"], fg=COLORS["text_dark"]).pack(anchor="w", padx=pad, pady=(pad, 5))
        tk.Label(self.content_frame, text="업체 정보와 메시지 템플릿을 설정합니다",
                 font=("맑은 고딕", 12), bg=COLORS["bg"], fg=COLORS["text_muted"]
                 ).pack(anchor="w", padx=pad, pady=(0, 15))

        card = tk.Frame(self.content_frame, bg=COLORS["card_bg"],
                        highlightbackground=COLORS["border"], highlightthickness=1)
        card.pack(fill="x", padx=pad, pady=5)

        form = tk.Frame(card, bg=COLORS["card_bg"])
        form.pack(fill="x", padx=25, pady=20)

        # 업체명
        tk.Label(form, text="업체명", font=("맑은 고딕", 14, "bold"),
                 bg=COLORS["card_bg"]).pack(anchor="w", pady=(0, 5))
        self.biz_name_entry = tk.Entry(form, font=("맑은 고딕", 16), bd=1, relief="solid")
        self.biz_name_entry.pack(fill="x", ipady=6)
        self.biz_name_entry.insert(0, self.settings.get("business_name", ""))
        tk.Label(form, text="카카오톡 메시지에 표시되는 업체명입니다",
                 font=("맑은 고딕", 11), bg=COLORS["card_bg"],
                 fg=COLORS["text_muted"]).pack(anchor="w", pady=(3, 15))

        # 메시지 템플릿
        tk.Label(form, text="알림 메시지 형식", font=("맑은 고딕", 14, "bold"),
                 bg=COLORS["card_bg"]).pack(anchor="w", pady=(0, 5))
        self.template_text = tk.Text(form, font=("맑은 고딕", 13), height=16,
                                      bd=1, relief="solid", wrap="word")
        self.template_text.pack(fill="x")
        self.template_text.insert("1.0", self.settings.get("message_template", ""))

        # 변수 안내
        var_info = tk.Frame(form, bg="#F0F4F8")
        var_info.pack(fill="x", pady=(10, 0))
        tk.Label(var_info, text="사용 가능한 변수:", font=("맑은 고딕", 11, "bold"),
                 bg="#F0F4F8", fg=COLORS["text_muted"]).pack(anchor="w", padx=10, pady=(8, 2))
        tk.Label(var_info, text="{업체명}  {고객명}  {플레이시간}  {누적시간}  {남은시간}",
                 font=("맑은 고딕", 12), bg="#F0F4F8", fg=COLORS["primary"]).pack(anchor="w", padx=10, pady=(0, 8))

        # 버튼
        btn_frame = tk.Frame(form, bg=COLORS["card_bg"])
        btn_frame.pack(fill="x", pady=(20, 0))

        tk.Button(btn_frame, text="💾  저장", font=("맑은 고딕", 14, "bold"),
                  bg=COLORS["success"], fg="white", bd=0, padx=25, pady=10,
                  cursor="hand2", command=self._save_settings).pack(side="left", padx=(0, 10))
        tk.Button(btn_frame, text="초기화", font=("맑은 고딕", 13),
                  bg=COLORS["border"], fg=COLORS["text_dark"], bd=0, padx=20, pady=10,
                  cursor="hand2", command=self._reset_settings).pack(side="left")

    def _save_settings(self):
        self.settings["business_name"] = self.biz_name_entry.get().strip()
        self.settings["message_template"] = self.template_text.get("1.0", "end-1c")
        save_json(SETTINGS_FILE, self.settings)
        messagebox.showinfo("저장 완료", "설정이 저장되었습니다")

    def _reset_settings(self):
        if messagebox.askyesno("확인", "기본 설정으로 초기화하시겠습니까?"):
            self.settings = DEFAULT_SETTINGS.copy()
            save_json(SETTINGS_FILE, self.settings)
            self.show_settings()

    # ─── 종료 처리 ───
    def on_closing(self):
        save_json(CUSTOMERS_FILE, self.customers)
        save_json(RECORDS_FILE, self.records)
        save_json(DRIVERS_FILE, self.drivers)
        save_json(SETTINGS_FILE, self.settings)
        self.destroy()


if __name__ == "__main__":
    app = AlimtalkManager()
    app.mainloop()
