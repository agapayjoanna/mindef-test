(function(d) {
    var w = 0;
    var l = 0;
    var g = 0;
    var i = 0;
    var f = 10;
    var k = 0;
    var h = "ontouchstart" in window;
    var c = "onorientationchange" in window;
    var m = false;
    var o = false;
    var n = false;
    var j = false;
    var z = false;
    var p = false;
    var u = "pointer";
    var y = "pointer";
    var s = new Array();
    var q = new Array();
    var a = new Array();
    var b = new Array();
    var v = new Array();
    var e = new Array();
    var t = new Array();
    var r = {
        showScrollbar: function(A, B) {
            if (A.scrollbarHide) {
                d("." + B).css({
                    opacity: A.scrollbarOpacity,
                    filter: "alpha(opacity:" + (A.scrollbarOpacity * 100) + ")"
                })
            }
        },
        hideScrollbar: function(C, D, E, A, B, J, I, K, H, G) {
            if (C.scrollbar && C.scrollbarHide) {
                for (var F = E; F < E + 25; F++) {
                    D[D.length] = r.hideScrollbarIntervalTimer(f * F, A[E], ((E + 24) - F) / 24, B, J, I, K, H, G, C)
                }
            }
        },
        hideScrollbarInterval: function(E, G, A, H, F, I, D, C, B) {
            k = (E * -1) / (A) * (I - D - C - F);
            r.setSliderOffset("." + H, k);
            d("." + H).css({
                opacity: B.scrollbarOpacity * G,
                filter: "alpha(opacity:" + (B.scrollbarOpacity * G * 100) + ")"
            })
        },
        slowScrollHorizontalInterval: function(F, L, D, O, M, P, E, K, J, I, Q, N, H, B, A, G) {
            newChildOffset = r.calcActiveOffset(G, L, 0, Q, D, P, H, I);
            if ((newChildOffset != t[A]) && (G.onSlideChange != "")) {
                G.onSlideChange(new r.args(G, F, d(F).children(":eq(" + I + ")"), I % H))
            }
            t[A] = newChildOffset;
            L = Math.floor(L);
            r.setSliderOffset(F, L);
            if (G.scrollbar) {
                k = Math.floor((L * -1) / (D) * (E - K - M));
                var C = M - J;
                if (L >= l) {
                    C = M - J - (k * -1);
                    r.setSliderOffset(d("." + O), 0);
                    d("." + O).css({
                        width: C + "px"
                    })
                } else {
                    if (L <= ((D * -1) + 1)) {
                        C = E - K - J - k;
                        r.setSliderOffset(d("." + O), k);
                        d("." + O).css({
                            width: C + "px"
                        })
                    } else {
                        r.setSliderOffset(d("." + O), k);
                        d("." + O).css({
                            width: C + "px"
                        })
                    }
                }
            }
        },
        slowScrollHorizontal: function(Q, I, O, R, K, M, X, Z, U, W, ab, J, C, F, N, S, Y) {
            var aa = new Array();
            var A = r.getSliderOffset(Q, "x");
            var H = 0;
            var B = 25 / 1024 * Z;
            var P = false;
            frictionCoefficient = Y.frictionCoefficient;
            elasticFrictionCoefficient = Y.elasticFrictionCoefficient;
            snapFrictionCoefficient = Y.snapFrictionCoefficient;
            snapToChildren = Y.snapToChildren;
            if ((K > 5) && snapToChildren) {
                H = 1
            } else {
                if ((K < -5) && snapToChildren) {
                    H = -1
                }
            }
            if (K < (B * -1)) {
                K = B * -1
            } else {
                if (K > B) {
                    K = B
                }
            }
            var D = r.getAnimationSteps(Y, K, A, O, l, J);
            var ac = r.calcActiveOffset(Y, D[D.length - 1], H, J, O, Z, F, t[C]);
            if (Y.infiniteSlider) {
                if (J[ac] > (J[S + 1] + Z)) {
                    ac = ac + S
                }
                if (J[ac] < (J[(S * 2 - 1)] - Z)) {
                    ac = ac - S
                }
            }
            if (((D[D.length - 1] < J[ac]) && (H < 0)) || ((D[D.length - 1] > J[ac]) && (H > 0)) || (!snapToChildren)) {
                while ((K > 1) || (K < -1)) {
                    K = K * frictionCoefficient;
                    A = A + K;
                    if ((A > l) || (A < (O * -1))) {
                        K = K * elasticFrictionCoefficient;
                        A = A + K
                    }
                    aa[aa.length] = A
                }
            }
            if (snapToChildren || (A > l) || (A < (O * -1))) {
                while ((A < (J[ac] - 0.5)) || (A > (J[ac] + 0.5))) {
                    A = ((A - (J[ac])) * snapFrictionCoefficient) + (J[ac]);
                    aa[aa.length] = A
                }
                aa[aa.length] = J[ac]
            }
            var L = 1;
            if ((aa.length % 2) != 0) {
                L = 0
            }
            var V = 0;
            var E = 0;
            if (Y.infiniteSlider) {
                ac = (ac % S) + S
            }
            for (var T = 0; T < I.length; T++) {
                clearTimeout(I[T])
            }
            var G = 0;
            for (var T = L; T < aa.length; T = T + 2) {
                if (Y.infiniteSlider) {
                    if (aa[T] < (J[(S * 2)] + Z)) {
                        aa[T] = aa[T] - (J[S])
                    }
                }
                if ((T == L) || (Math.abs(aa[T] - G) > 1) || (T >= (aa.length - 2))) {
                    G = aa[T];
                    I[I.length] = r.slowScrollHorizontalIntervalTimer(f * T, Q, aa[T], O, R, X, Z, U, W, ab, ac, J, N, F, S, C, Y)
                }
            }
            I[I.length] = r.onSlideCompleteTimer(f * (T + 1), Y, Q, d(Q).children(":eq(" + ac + ")"), ac % F, C);
            e[C] = I;
            r.hideScrollbar(Y, I, T, aa, O, R, X, Z, W, ab)
        },
        onSlideComplete: function(B, D, C, E, A) {
            if (s[A] != E) {
                B.onSlideComplete(new r.args(B, d(D), C, E))
            }
            s[A] = E
        },
        getSliderOffset: function(B, D) {
            var C = 0;
            if (D == "x") {
                D = 4
            } else {
                D = 5
            }
            if (h || m) {
                var A = d(B).css("-webkit-transform").split(",");
                C = parseInt(A[D], 10)
            } else {
                C = parseInt(d(B).css("left"), 10)
            }
            return C
        },
        setSliderOffset: function(A, B) {
            if (h || m) {
                d(A).css({
                    webkitTransform: "translateX(" + B + "px)"
                })
            } else {
                d(A).css({
                    left: B + "px"
                })
            }
        },
        setBrowserInfo: function() {
            if (navigator.userAgent.match("WebKit") != null) {
                m = true;
                u = "-webkit-grab";
                y = "-webkit-grabbing"
            } else {
                if (navigator.userAgent.match("Gecko") != null) {
                    p = true;
                    u = "move";
                    y = "-moz-grabbing"
                } else {
                    if (navigator.userAgent.match("MSIE 7") != null) {
                        o = true;
                        z = true
                    } else {
                        if (navigator.userAgent.match("MSIE 8") != null) {
                            n = true;
                            z = true
                        } else {
                            if (navigator.userAgent.match("MSIE 9") != null) {
                                j = true;
                                z = true
                            }
                        }
                    }
                }
            }
        },
        getAnimationSteps: function(D, B, C, G, A, F) {
            var E = new Array();
            if ((B <= 1) && (B >= 0)) {
                B = -2
            } else {
                if ((B >= -1) && (B <= 0)) {
                    B = 2
                }
            }
            while ((B > 1) || (B < -1)) {
                B = B * D.frictionCoefficient;
                C = C + B;
                if ((C > A) || (C < (G * -1))) {
                    B = B * D.elasticFrictionCoefficient;
                    C = C + B
                }
                E[E.length] = C
            }
            activeChildOffset = 0;
            return E
        },
        calcActiveOffset: function(C, J, L, O, B, M, D, E) {
            var I = false;
            var H = new Array();
            var G;
            for (var K = 0; K < O.length; K++) {
                if ((O[K] <= J) && (O[K] > (J - M))) {
                    if (!I && (O[K] != J)) {
                        H[H.length] = O[K - 1]
                    }
                    H[H.length] = O[K];
                    I = true
                }
            }
            if (H.length == 0) {
                H[0] = O[O.length - 1]
            }
            var A = M;
            var F = 0;
            for (var K = 0; K < H.length; K++) {
                var N = Math.abs(J - H[K]);
                if (N < A) {
                    F = H[K];
                    A = N
                }
            }
            for (var K = 0; K < O.length; K++) {
                if (F == O[K]) {
                    G = K
                }
            }
            if ((L < 0) && (G % D == E % D)) {
                G = E + 1;
                if (G >= O.length) {
                    G = O.length - 1
                }
            } else {
                if ((L > 0) && (G % D == E % D)) {
                    G = E - 1;
                    if (G < 0) {
                        G = 0
                    }
                }
            }
            return G
        },
        changeSlide: function(A, L, F, J, M, V, Y, T, U, Z, G, W, D, I, N, X) {
            r.autoSlidePause(W);
            for (var O = 0; O < F.length; O++) {
                clearTimeout(F[O])
            }
            var S = Math.ceil(X.autoSlideTransTimer / 10) + 1;
            var Q = r.getSliderOffset(L, "x");
            if (X.infiniteSlider) {
                if ((Q > (G[N + 1] + Y)) && (A == (N * 2 - 2))) {
                    Q = Q - I
                }
            }
            var C = G[A];
            var K = C - Q;
            var B = new Array();
            var H;
            var R;
            r.showScrollbar(X, M);
            for (var P = 0; P <= S; P++) {
                H = P;
                H /= S;
                H--;
                R = Q + K * (Math.pow(H, 5) + 1);
                if (X.infiniteSlider) {
                    if (R > (G[N + 1] + Y)) {
                        R = R - I
                    }
                    if (R < (G[N * 2 - 1] - Y)) {
                        R = R + I
                    }
                }
                B[B.length] = R
            }
            if (X.infiniteSlider) {
                A = (A % N) + N
            }
            var E = 0;
            for (var P = 0; P < B.length; P++) {
                if (X.infiniteSlider) {
                    if (B[P] < (G[(N * 2)] + Y)) {
                        B[P] = B[P] - (G[N])
                    }
                }
                if ((P == 0) || (Math.abs(B[P] - E) > 1) || (P >= (B.length - 2))) {
                    E = B[P];
                    F[P] = r.slowScrollHorizontalIntervalTimer(f * (P + 1), L, B[P], J, M, V, Y, T, U, Z, A, G, I, D, N, W, X)
                }
                if ((P == 0) && (X.onSlideStart != "")) {
                    X.onSlideStart(new r.args(X, L, d(L).children(":eq(" + A + ")"), A % D))
                }
            }
            if (K != 0) {
                F[F.length] = r.onSlideCompleteTimer(f * (P + 1), X, L, d(L).children(":eq(" + A + ")"), A % D, W)
            }
            e[W] = F;
            r.hideScrollbar(X, F, P, B, J, M, V, Y, U, Z);
            r.autoSlide(L, F, J, M, V, Y, T, U, Z, G, W, D, I, N, X)
        },
        autoSlide: function(J, G, C, M, K, N, D, I, H, O, A, F, L, B, E) {
            if (!E.autoSlide) {
                return false
            }
            r.autoSlidePause(A);
            q[A] = setTimeout(function() {
                if (!E.infiniteSlider && (t[A] > O.length - 1)) {
                    t[A] = t[A] - B
                }
                var P = E.infiniteSlider ? t[A] + 1 : (t[A] + 1) % B;
                r.changeSlide(P, J, G, C, M, K, N, D, I, H, O, A, F, L, B, E);
                r.autoSlide(J, G, C, M, K, N, D, I, H, O, A, F, L, B, E)
            }, E.autoSlideTimer + E.autoSlideTransTimer)
        },
        autoSlidePause: function(A) {
            clearTimeout(q[A])
        },
        slowScrollHorizontalIntervalTimer: function(D, J, C, H, K, O, Q, M, N, R, A, F, G, E, L, B, P) {
            var I = setTimeout(function() {
                r.slowScrollHorizontalInterval(J, C, H, K, O, Q, M, N, R, A, F, G, E, L, B, P)
            }, D);
            return I
        },
        onSlideCompleteTimer: function(D, E, G, F, A, C) {
            var B = setTimeout(function() {
                r.onSlideComplete(E, G, F, A, C)
            }, D);
            return B
        },
        hideScrollbarIntervalTimer: function(I, E, G, A, H, F, J, D, C, B) {
            var K = setTimeout(function() {
                r.hideScrollbarInterval(E, G, A, H, F, J, D, C, B)
            }, I);
            return K
        },
        args: function(B, C, A, D) {
            this.settings = B;
            this.sliderObject = C;
            this.currentSlideObject = A;
            this.currentSlideNumber = D
        },
        preventDrag: function(A) {
            A.preventDefault()
        },
        preventClick: function(A) {
            A.stopImmediatePropagation();
            return false
        },
        enableClick: function() {
            return true
        }
    };
    r.setBrowserInfo();
    var x = {
        init: function(A) {
            var B = d.extend({
                elasticPullResistance: 0.6,
                frictionCoefficient: 0.92,
                elasticFrictionCoefficient: 0.6,
                snapFrictionCoefficient: 0.92,
                snapToChildren: false,
                startAtSlide: 1,
                scrollbar: false,
                scrollbarHide: true,
                scrollbarLocation: "top",
                scrollbarContainer: "",
                scrollbarOpacity: 0.4,
                scrollbarHeight: "4px",
                scrollbarBorder: "0",
                scrollbarMargin: "5px",
                scrollbarBackground: "#000",
                scrollbarBorderRadius: "100px",
                scrollbarShadow: "0 0 0 #000",
                desktopClickDrag: false,
                responsiveSlideContainer: true,
                responsiveSlides: true,
                navSlideSelector: "",
                navPrevSelector: "",
                navNextSelector: "",
                autoSlideToggleSelector: "",
                autoSlide: false,
                autoSlideTimer: 5000,
                autoSlideTransTimer: 750,
                infiniteSlider: false,
                onSliderLoaded: "",
                onSlideStart: "",
                onSlideChange: "",
                onSlideComplete: function() {}
            }, A);
            return this.each(function(au) {
                w++;
                var K = w;
                var C = new Array();
                b[K] = B;
                var ai;
                var al = 0;
                var am = new Array(0, 0);
                var J = new Array(0, 0);
                var an = "scrollbarBlock" + w;
                var Z = "scrollbar" + w;
                var M;
                var H;
                var T;
                var at;
                var V = d(this);
                var E;
                var ad;
                var Q;
                var af;
                var ah;
                var Y;
                t[K] = B.startAtSlide - 1;
                var ak = -1;
                var F = new Array();
                var ag;
                var L = 0;
                var aj = 0;
                var ae = 0;
                var O = 0;
                var S = d(this).children(":first-child");
                var ax;
                var X = d(S).children().size();
                var N = false;
                var ab = 0;
                var W = false;
                var ac = undefined;
                var I = 0;
                var ao;
                var U = X;
                var aa = true;
                s[K] = -1;
                var G = false;
                a[K] = V;
                v[K] = false;
                var D = -1;
                e[K] = new Array();
                var P = d(this);
                var aw = P.data("iosslider");
                if (aw != undefined) {
                    return true
                }
                if (B.infiniteSlider) {
                    B.scrollbar = false;
                    d(S).children().clone(true, true).prependTo(S).clone(true, true).appendTo(S);
                    U = X
                }
                ax = d(S).children();
                if (B.scrollbar) {
                    if (B.scrollbarContainer != "") {
                        d(B.scrollbarContainer).append("<div class = '" + an + "'><div class = '" + Z + "'></div></div>")
                    } else {
                        d(S).parent().append("<div class = '" + an + "'><div class = '" + Z + "'></div></div>")
                    }
                }
                if (!ar()) {
                    return true
                }
                if (B.infiniteSlider) {
                    t[K] = t[K] + U;
                    r.setSliderOffset(S, ag[t[K]])
                }
                d(this).find("a").bind("mousedown", r.preventDrag);
                d(this).find("[onclick]").bind("click", r.preventDrag).each(function() {
                    d(this).data("onclick", this.onclick)
                });
                if (B.onSliderLoaded != "") {
                    B.onSliderLoaded(new r.args(B, S, d(S).children(":eq(" + t[K] + ")"), t[K] % U))
                }
                s[K] = t[K] % U;

                function ar() {
                    r.autoSlidePause(K);
                    d(V).css("width", "");
                    d(V).css("height", "");
                    d(ax).css("width", "");
                    ai = 0;
                    ag = new Array();
                    T = d(V).parent().width();
                    E = d(V).outerWidth(true);
                    if (B.responsiveSlideContainer) {
                        E = (d(V).outerWidth(true) > T) ? T : d(V).outerWidth(true)
                    }
                    d(V).css({
                        position: "relative",
                        top: "0",
                        left: "0",
                        overflow: "hidden",
                        zIndex: 1,
                        width: E
                    });
                    if (B.responsiveSlides) {
                        d(ax).each(function(aA) {
                            var az = d(this).outerWidth(true);
                            if (az > E) {
                                az = E + (d(this).outerWidth(true) - d(this).width()) * -1
                            } else {
                                az = d(this).width()
                            }
                            d(this).css({
                                width: az
                            })
                        })
                    }
                    d(S).children().each(function(az) {
                        d(this).css({
                            "float": "left"
                        });
                        ag[az] = ai * -1;
                        if (d(S).children().index(d(this)) == d(S).children().length - 1 && d(this).parent().parent().parent().hasClass("key_topics_box")) {
                            var aA = d(this).children().filter(function() {
                                return d(this).html() == ""
                            }).length;
                            ag[az] = ag[az] + 150 * aA
                        }
                        ai = ai + d(this).outerWidth(true)
                    });
                    for (var ay = 0; ay < ag.length; ay++) {
                        if (ag[ay] <= ((ai - E) * -1)) {
                            break
                        }
                        ab = ay
                    }
                    ai = ai - E;
                    d(S).css({
                        webkitPerspective: 1000,
                        webkitBackfaceVisibility: "hidden",
                        position: "relative",
                        cursor: u,
                        width: ai + E + "px",
                        overflow: "hidden"
                    });
                    at = d(V).parent().height();
                    ad = d(V).height();
                    if (B.responsiveSlideContainer) {
                        ad = (d(V).height() > at) ? at : d(V).height()
                    }
                    d(V).css({
                        height: ad
                    });
                    r.setSliderOffset(S, ag[t[K]]);
                    if (ai <= 0) {
                        d(S).css({
                            cursor: "default"
                        });
                        return false
                    }
                    if (!h && !B.desktopClickDrag) {
                        d(S).css({
                            cursor: "default"
                        })
                    }
                    if (B.scrollbar) {
                        d("." + an).css({
                            margin: B.scrollbarMargin,
                            overflow: "hidden",
                            display: "none"
                        });
                        d("." + an + " ." + Z).css({
                            border: B.scrollbarBorder
                        });
                        af = parseInt(d("." + an).css("marginLeft")) + parseInt(d("." + an).css("marginRight"));
                        ah = parseInt(d("." + an + " ." + Z).css("borderLeftWidth"), 10) + parseInt(d("." + an + " ." + Z).css("borderRightWidth"), 10);
                        M = (B.scrollbarContainer != "") ? d(B.scrollbarContainer).width() : E;
                        H = (M - af) / X;
                        if (!B.scrollbarHide) {
                            L = B.scrollbarOpacity
                        }
                        d("." + an).css({
                            position: "absolute",
                            left: 0,
                            width: M - af + "px",
                            margin: B.scrollbarMargin
                        });
                        if (B.scrollbarLocation == "top") {
                            d("." + an).css("top", "0")
                        } else {
                            d("." + an).css("bottom", "0")
                        }
                        d("." + an + " ." + Z).css({
                            borderRadius: B.scrollbarBorderRadius,
                            background: B.scrollbarBackground,
                            height: B.scrollbarHeight,
                            width: H - ah + "px",
                            minWidth: B.scrollbarHeight,
                            border: B.scrollbarBorder,
                            webkitPerspective: 1000,
                            webkitBackfaceVisibility: "hidden",
                            webkitTransform: "translateX(" + Math.floor((ag[t[K]] * -1) / (ai) * (M - af - H)) + "px)",
                            opacity: L,
                            filter: "alpha(opacity:" + (L * 100) + ")",
                            boxShadow: B.scrollbarShadow
                        });
                        d("." + an).css({
                            display: "block"
                        });
                        if (!h) {
                            d("." + Z).css({
                                position: "relative",
                                left: Math.floor((ag[t[K]] * -1) / (ai) * (M - af - H))
                            })
                        }
                    }
                    if (B.infiniteSlider) {
                        ao = (ai + E) / 3
                    }
                    if (B.navSlideSelector != "") {
                        d(B.navSlideSelector).each(function(az) {
                            d(this).css({
                                cursor: "pointer"
                            });
                            d(this).unbind("click.iosSliderEvent").bind("click.iosSliderEvent", function() {
                                var aA = az;
                                if (B.infiniteSlider) {
                                    aA = az + U
                                }
                                r.changeSlide(aA, S, C, ai, Z, H, E, M, af, ah, ag, K, U, ao, X, B)
                            })
                        })
                    }
                    if (B.navPrevSelector != "") {
                        d(B.navPrevSelector).css({
                            cursor: "pointer"
                        });
                        d(B.navPrevSelector).unbind("click.iosSliderEvent").bind("click.iosSliderEvent", function() {
                            if ((t[K] > 0) || B.infiniteSlider) {
                                r.changeSlide(t[K] - 1, S, C, ai, Z, H, E, M, af, ah, ag, K, U, ao, X, B)
                            }
                        })
                    }
                    if (B.navNextSelector != "") {
                        d(B.navNextSelector).css({
                            cursor: "pointer"
                        });
                        d(B.navNextSelector).unbind("click.iosSliderEvent").bind("click.iosSliderEvent", function() {
                            if ((t[K] < ag.length - 1) || B.infiniteSlider) {
                                r.changeSlide(t[K] + 1, S, C, ai, Z, H, E, M, af, ah, ag, K, U, ao, X, B)
                            }
                        })
                    }
                    if (B.autoSlide) {
                        if (B.autoSlideToggleSelector != "") {
                            d(B.autoSlideToggleSelector).css({
                                cursor: "pointer"
                            });
                            d(B.autoSlideToggleSelector).unbind("click.iosSliderEvent").bind("click.iosSliderEvent", function() {
                                if (!G) {
                                    r.autoSlidePause(K);
                                    G = true;
                                    d(B.autoSlideToggleSelector).addClass("on")
                                } else {
                                    r.autoSlide(S, C, ai, Z, H, E, M, af, ah, ag, K, U, ao, X, B);
                                    G = false;
                                    d(B.autoSlideToggleSelector).removeClass("on")
                                }
                            })
                        }
                        if (!G) {
                            r.autoSlide(S, C, ai, Z, H, E, M, af, ah, ag, K, U, ao, X, B)
                        }
                        if (!h) {
                            d(V).bind("mouseenter.iosSliderEvent", function() {
                                r.autoSlidePause(K)
                            });
                            d(V).bind("mouseleave.iosSliderEvent", function() {
                                if (!G) {
                                    r.autoSlide(S, C, ai, Z, H, E, M, af, ah, ag, K, U, ao, X, B)
                                }
                            })
                        } else {
                            d(V).bind("touchend.iosSliderEvent", function() {
                                if (!G) {
                                    r.autoSlide(S, C, ai, Z, H, E, M, af, ah, ag, K, U, ao, X, B)
                                }
                            })
                        }
                    }
                    d(V).data("iosslider", {
                        obj: P,
                        settings: B,
                        scrollerNode: S,
                        numberOfSlides: X,
                        sliderNumber: K,
                        childrenOffsets: ag,
                        sliderMax: ai,
                        scrollbarClass: Z,
                        scrollbarWidth: H,
                        scrollbarStageWidth: M,
                        stageWidth: E,
                        scrollMargin: af,
                        scrollBorder: ah,
                        infiniteSliderOffset: U,
                        infiniteSliderWidth: ao
                    });
                    aa = false;
                    return true
                }
                if (b[K].responsiveSlides || b[K].responsiveSlideContainer) {
                    var R = c ? "orientationchange" : "resize";
                    d(window).bind(R + ".iosSliderEvent", function() {
                        if (!ar()) {
                            return true
                        }
                    })
                }
                if (h || B.desktopClickDrag) {
                    var aq = h ? "touchstart.iosSliderEvent" : "mousedown.iosSliderEvent";
                    d(S).bind(aq, function(aA) {
                        r.autoSlidePause(K);
                        if (!h) {
                            if (window.getSelection) {
                                if (window.getSelection().empty) {
                                    window.getSelection().empty()
                                } else {
                                    if (window.getSelection().removeAllRanges) {
                                        window.getSelection().removeAllRanges()
                                    }
                                }
                            } else {
                                if (document.selection) {
                                    document.selection.empty()
                                }
                            }
                            eventX = aA.pageX;
                            eventY = aA.pageY;
                            W = true;
                            ac = this;
                            d(this).css({
                                cursor: y
                            })
                        } else {
                            eventX = event.touches[0].pageX;
                            eventY = event.touches[0].pageY
                        }
                        am = new Array(0, 0);
                        J = new Array(0, 0);
                        g = 0;
                        N = false;
                        for (var az = 0; az < C.length; az++) {
                            clearTimeout(C[az])
                        }
                        var ay = r.getSliderOffset(this, "x");
                        D = t[K];
                        if (B.infiniteSlider) {
                            if (t[K] % X == 0) {
                                d(this).children().each(function(aB) {
                                    if ((aB % X == 0) && (aB != t[K])) {
                                        d(this).replaceWith(function() {
                                            return d(S).children(":eq(" + t[K] + ")").clone(true)
                                        })
                                    }
                                })
                            }
                        }
                        if (ay > l) {
                            ay = l;
                            r.setSliderOffset(this, ay);
                            d("." + Z).css({
                                width: (H - ah) + "px"
                            })
                        } else {
                            if (ay < (ai * -1)) {
                                ay = ai * -1;
                                r.setSliderOffset(this, ay);
                                r.setSliderOffset(d("." + Z), (M - af - H));
                                d("." + Z).css({
                                    width: (H - ah) + "px"
                                })
                            }
                        }
                        aj = (r.getSliderOffset(this, "x") - eventX) * -1;
                        ae = (r.getSliderOffset(this, "y") - eventY) * -1;
                        am[1] = eventX;
                        J[1] = eventY
                    });
                    var av = h ? "touchmove.iosSliderEvent" : "mousemove.iosSliderEvent";
                    d(S).bind(av, function(aB) {
                        var aA = 0;
                        if (!h) {
                            if (window.getSelection) {
                                if (window.getSelection().empty) {
                                    window.getSelection().empty()
                                } else {
                                    if (window.getSelection().removeAllRanges) {
                                        window.getSelection().removeAllRanges()
                                    }
                                }
                            } else {
                                if (document.selection) {
                                    document.selection.empty()
                                }
                            }
                        }
                        if (h) {
                            eventX = event.touches[0].pageX;
                            eventY = event.touches[0].pageY
                        } else {
                            eventX = aB.pageX;
                            eventY = aB.pageY;
                            if (!W) {
                                return false
                            }
                        }
                        if (B.infiniteSlider) {
                            if (r.getSliderOffset(this, "x") > (ag[X + 1] + E)) {
                                aj = aj + ao
                            }
                            if (r.getSliderOffset(this, "x") < (ag[X * 2 - 1] - E)) {
                                aj = aj - ao
                            }
                        }
                        am[0] = am[1];
                        am[1] = eventX;
                        g = (am[1] - am[0]) / 2;
                        J[0] = J[1];
                        J[1] = eventY;
                        i = (J[1] - J[0]) / 2;
                        if (!N) {
                            if (B.onSlideStart != "") {
                                B.onSlideStart(new r.args(B, this, d(this).children(":eq(" + t[K] + ")"), t[K] % U))
                            }
                        }
                        if (((g > 5) || (g < -5)) && (h)) {
                            event.preventDefault();
                            N = true
                        } else {
                            if (!h) {
                                N = true
                            }
                        }
                        if (N) {
                            var ay = r.getSliderOffset(this, "x");
                            if (h) {
                                if (O != event.touches.length) {
                                    aj = (ay * -1) + eventX
                                }
                                O = event.touches.length
                            }
                            elasticPullResistance = B.elasticPullResistance;
                            if (ay > l) {
                                aA = (aj - eventX) * elasticPullResistance
                            }
                            if (ay < (ai * -1)) {
                                aA = (ai + ((aj - eventX) * -1)) * elasticPullResistance * -1
                            }
                            r.setSliderOffset(this, (aj - eventX - aA) * -1);
                            if (B.scrollbar) {
                                r.showScrollbar(B, Z);
                                k = Math.floor((aj - eventX - aA) / (ai) * (M - af - H));
                                var az = H;
                                if (ay >= l) {
                                    az = H - ah - (k * -1);
                                    r.setSliderOffset(d("." + Z), 0);
                                    d("." + Z).css({
                                        width: az + "px"
                                    })
                                } else {
                                    if (ay <= ((ai * -1) + 1)) {
                                        az = M - af - ah - k;
                                        r.setSliderOffset(d("." + Z), k);
                                        d("." + Z).css({
                                            width: az + "px"
                                        })
                                    } else {
                                        r.setSliderOffset(d("." + Z), k)
                                    }
                                }
                            }
                            if (h) {
                                Y = event.touches[0].pageX
                            }
                        }
                        ak = r.calcActiveOffset(B, (aj - eventX - aA) * -1, 0, ag, ai, E, U, undefined);
                        if ((ak != t[K]) && (B.onSlideChange != "")) {
                            t[K] = ak;
                            B.onSlideChange(new r.args(B, this, d(this).children(":eq(" + ak + ")"), ak % U))
                        }
                    });
                    d(S).bind("touchend.iosSliderEvent", function() {
                        if (event.touches.length != 0) {
                            for (var ay = 0; ay < sizeof(event.touches.length); ay++) {
                                if (event.touches[ay].pageX == Y) {
                                    r.slowScrollHorizontal(this, C, ai, Z, g, i, H, E, M, af, ah, ag, K, U, ao, X, B)
                                }
                            }
                        } else {
                            r.slowScrollHorizontal(this, C, ai, Z, g, i, H, E, M, af, ah, ag, K, U, ao, X, B)
                        }
                    });
                    if (!h) {
                        var ap = d(window);
                        if (n || o) {
                            var ap = d(document)
                        }
                        d(ap).bind("mouseup.iosSliderEvent", function(ay) {
                            if (N) {
                                d(S).children(":eq(" + t[K] + ")").find("a").unbind("click.disableClick").bind("click.disableClick", r.preventClick)
                            } else {
                                d(S).children(":eq(" + t[K] + ")").find("a").unbind("click.disableClick").bind("click.disableClick", r.enableClick)
                            }
                            d(S).children(":eq(" + t[K] + ")").find("[onclick]").each(function() {
                                this.onclick = function(az) {
                                    if (N) {
                                        return false
                                    }
                                    d(this).data("onclick").call(this, az || window.event)
                                }
                            });
                            d(S).children(":eq(" + t[K] + ")").find("*").each(function() {
                                var aB = d(this).data("events");
                                if (aB != undefined) {
                                	if (aB.click != undefined && aB.click[0].namespace != "iosSliderEvent") { 
                                        if (!N) {
                                            return false
                                        }
                                        d(this).one("click.disableClick", r.preventClick);
                                        var az = d(this).data("events").click;
                                        var aA = az.pop();
                                        az.splice(0, 0, aA)
                                    }
                                }
                            });
                            if (!v[K]) {
                                d(S).css({
                                    cursor: u
                                });
                                W = false;
                                if (ac == undefined) {
                                    return false
                                }
                                r.slowScrollHorizontal(ac, C, ai, Z, g, i, H, E, M, af, ah, ag, K, U, ao, X, B);
                                ac = undefined
                            }
                        })
                    }
                }
            })
        },
        destroy: function(A) {
            return this.each(function() {
                var C = d(this);
                var B = C.data("iosslider");
                if (B == undefined) {
                    return false
                }
                if (A == undefined) {
                    A = true
                }
                r.autoSlidePause(B.sliderNumber);
                v[B.sliderNumber] = true;
                d(this).unbind(".iosSliderEvent");
                d(this).children(":first-child").unbind(".iosSliderEvent");
                d(this).children(":first-child").children().unbind(".iosSliderEvent");
                if (A) {
                    d(this).attr("style", "");
                    d(this).children(":first-child").attr("style", "");
                    d(this).children(":first-child").children().attr("style", "");
                    d(B.settings.navSlideSelector).attr("style", "");
                    d(B.settings.navPrevSelector).attr("style", "");
                    d(B.settings.navNextSelector).attr("style", "");
                    d(B.settings.autoSlideToggleSelector).attr("style", "")
                }
                if (B.settings.infiniteSlider) {
                    d(this).children(":first-child").html();
                    d(this).children(":first-child").html(d(this).children(":first-child").children(":nth-child(-n+" + B.numberOfSlides + ")").clone(true))
                }
                C.removeData("iosslider")
            })
        },
        goToSlide: function(A) {
            return this.each(function() {
                var C = d(this);
                var B = C.data("iosslider");
                if (B == undefined) {
                    return false
                }
                A = (A - 1) % B.numberOfSlides;
                if (B.settings.infiniteSlider) {
                    A = A + B.infiniteSliderOffset
                }
                r.changeSlide(A, d(B.scrollerNode), e[B.sliderNumber], B.sliderMax, B.scrollbarClass, B.scrollbarWidth, B.stageWidth, B.scrollbarStageWidth, B.scrollMargin, B.scrollBorder, B.childrenOffsets, B.sliderNumber, B.infiniteSliderOffset, B.infiniteSliderWidth, B.numberOfSlides, B.settings);
                t[B.sliderNumber] = A
            })
        }
    };
    d.fn.iosSlider = function(A) {
        if (x[A]) {
            return x[A].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof A === "object" || !A) {
                return x.init.apply(this, arguments)
            } else {
                d.error("invalid method call!")
            }
        }
    }
})(jQuery);