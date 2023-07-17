// ==UserScript==
// @name         Bing美化
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Bing首页和搜索优化，基于wangzhen-CHN开发
// @author       RaysonLu
// @require https://cdn.staticfile.org/jquery/2.1.4/jquery.min.js
// @match        *://*.bing.com/*
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @run-at       document-start
// @license MIT
// @icon    data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCAyODAgMjgwIiB3aWR0aD0iMjgwcHgiIGhlaWdodD0iMjgwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZmlsbD0iI2VkNzg5OSIgZD0iTSA2MC43NzcgMzAuNzg0IEMgNzUuMDQxIDI0LjY1MSA5MC4yOTcgMjEuMTU0IDEwNS44MDggMjAuNDYzIEMgMTEyLjU2OCAyMC40MzggMTE5LjMwNyAyMS4xODkgMTI1Ljg5NCAyMi42OTkgQyAxMzUuNjk3IDI1Ljg0MSAxNDUuMTE3IDMwLjA2OCAxNTMuOTggMzUuMzAxIEwgMTI5LjgwOCAxMTcuNTM3IEMgMTE1LjkxNSAxMDcuNzg4IDk5LjQ2MSAxMDIuMzQzIDgyLjQ5NyAxMDEuODggQyA2Ny4xMjggMTAyLjMwMSA1MS45NjEgMTA1LjQ5MSAzNy43MjMgMTExLjMgTCA2MC43NzcgMzAuNzg0IFoiIHN0eWxlPSIiLz4KICA8cGF0aCBmaWxsPSIjZjI4M2E1IiBkPSJNIDEyNS44OTQgMjIuNjk5IEMgMTE5LjMwNyAyMS4xODkgMTEyLjU2OCAyMC40MzggMTA1LjgwOCAyMC40NjMgQyA5MC4yOTcgMjEuMTU0IDc1LjA0MSAyNC42NTEgNjAuNzc3IDMwLjc4NCBMIDU4LjU0MSAzOC41NyBDIDU2Ljk4MiA0My42MzIgNjEuNDg3IDQ4LjQ4NCA2Ni42NTIgNDcuMzAyIEMgNjYuODE3IDQ3LjI2NCA2Ni45ODEgNDcuMjIyIDY3LjE0MiA0Ny4xNzEgQyA3Ni44OTcgNDQuMDk2IDg3LjAyNiA0Mi4zNzQgOTcuMjQ5IDQyLjA1MyBDIDEwNC4wMDkgNDIuMDI5IDExMC43NDcgNDIuNzc5IDExNy4zMzUgNDQuMjkgQyAxMjcuMTM2IDQ3LjQzMiAxMzYuNTU4IDUxLjY1OCAxNDUuNDIxIDU2Ljg5MiBMIDEyNy44NzIgMTE2LjMzMSBMIDEyOS44MDggMTE3LjUzNyBMIDE1My45OCAzNS4zMDEgQyAxNDUuMTE3IDMwLjA2OCAxMzUuNjk3IDI1Ljg0MSAxMjUuODk0IDIyLjY5OSBaIiBzdHlsZT0iIi8+CiAgPHBhdGggZmlsbD0iI2Y5ZTNhZSIgZD0iTSAyNDEuMDM0IDE2Ny44NTkgQyAyMjYuOTY3IDE3Mi41ODIgMjEyLjI1NiAxNzUuMDkxIDE5Ny40MjEgMTc1LjI5OSBDIDE3OC4zODYgMTc1LjcxOCAxNTkuNjk3IDE3MC4xODQgMTQzLjk1OSAxNTkuNDcyIEwgMTIwLjM0NiAyNDAuODg5IEMgMTI3LjMxMyAyNDQuODkgMTUwLjg0IDI1Ny40OTIgMTY4LjgxOSAyNTcuNDkyIEMgMTg1Ljk1MiAyNTYuOTIxIDIwMi44MTYgMjUzLjA2OCAyMTguNDk1IDI0Ni4xMzYgTCAyNDEuMDM0IDE2Ny44NTkgWiIgc3R5bGU9IiIvPgogIDxwYXRoIGZpbGw9IiM4NWNiZjgiIGQ9Ik0gOTguNTgyIDIyOC4wMzEgQyAxMDQuNTYxIDIwNy44NTggMTE4Ljg4NCAxNTkuMjE0IDEyMy4xODUgMTQ0LjUwNCBDIDEyMC4wODggMTQyLjYxIDExNi45MDUgMTQwLjcxOSAxMTMuNjc5IDEzOC45OTkgQyAxMDIuNjM3IDEzMi45OTkgOTAuMzI4IDEyOS43MSA3Ny43NjYgMTI5LjQwNyBDIDc2LjIxNyAxMjkuNDA3IDc0LjY2OCAxMjkuNDA3IDczLjA3NyAxMjkuNDA3IEMgNjAuNjY3IDEzMC41NzMgNDguNDQ1IDEzMy4yNTkgMzYuNjkgMTM3LjQwNyBDIDM0LjQxMSAxMzguMjI0IDMyLjA4OCAxMzkuMTI4IDI5LjcyMyAxNDAuMDczIEwgNi4zMjUgMjIwLjkzMiBDIDIwLjE0MSAyMTUuNTMzIDM0LjgwNSAyMTIuNjIxIDQ5LjYzNyAyMTIuMzMxIEMgNjcuMTc0IDIxMi41ODkgODQuMjI5IDIxOC4xMjEgOTguNTgyIDIyOC4yMDIgTCA5OC41ODIgMjI4LjAzMSBaIiBzdHlsZT0iIi8+CiAgPHBhdGggZmlsbD0iI2Y2ZDM5NyIgZD0iTSAyMjIuODM5IDIyMC4zMzEgQyAyMDcuMTYgMjI3LjI2IDE5MC4yOTYgMjMxLjExNiAxNzMuMTYzIDIzMS42ODUgQyAxNTcuMDMzIDIzMS42ODUgMTM2LjUxOCAyMjEuNTc3IDEyNy40IDIxNi41ODggTCAxMjAuMzg4IDI0MC44ODkgQyAxMjcuMzU2IDI0NC44OSAxNTAuODgyIDI1Ny40OTIgMTY4Ljg2MSAyNTcuNDkyIEMgMTg1Ljk5NSAyNTYuOTIxIDIwMi44NiAyNTMuMDY4IDIxOC41MzggMjQ2LjEzNiBMIDI0MS4wMzQgMTY3Ljg1OSBMIDIzNy42MzYgMTY4LjgwNSBMIDIyMi44MzkgMjIwLjMzMSBaIiBzdHlsZT0iIi8+CiAgPHBhdGggZmlsbD0iIzZmYzZmMCIgZD0iTSAxMDIuODg0IDIwMi4yMjMgQyA4OC41MzEgMTkyLjE0MiA3MS40NzYgMTg2LjYxMiA1My45MzkgMTg2LjM1MiBDIDQwLjM0NyAxODYuNjQgMjYuOTAxIDE4OS4yIDE0LjE1NCAxOTMuOTIzIEwgNi4zMjUgMjIwLjkzMiBDIDIwLjE0MSAyMTUuNTMzIDM0LjgwNSAyMTIuNjIxIDQ5LjYzNyAyMTIuMzMxIEMgNjcuMTc0IDIxMi41ODkgODQuMjI5IDIxOC4xMjEgOTguNTgyIDIyOC4yMDIgQyAxMDQuNTYxIDIwOC4wMjkgMTE4Ljg4NCAxNTkuMzg1IDEyMy4xODUgMTQ0LjY3NSBMIDEyMC4zODggMTQzLjA0MiBDIDExNC40NTMgMTYzLjA0MSAxMDYuODQgMTg4Ljg0NyAxMDIuODg0IDIwMi4yMjMgWiIgc3R5bGU9IiIvPgogIDxwYXRoIGZpbGw9IiM3MmNhYWYiIGQ9Ik0gMjcyLjk5IDU3LjYyNCBDIDI1OC44MTcgNjMuMzMxIDI0My43MDggNjYuMzY0IDIyOC40MzEgNjYuNTcgQyAyMDkuNTg0IDY2LjgwOCAxOTEuMTIzIDYxLjIyMiAxNzUuNTcgNTAuNTY5IEwgMTUxLjYxNCAxMzIuODkgQyAxNjYuOTQ5IDE0Mi45NjEgMTg0Ljg4MSAxNDguMzU0IDIwMy4yMjcgMTQ4LjQxOCBDIDIxOS4wMzIgMTQ4LjE4MiAyMzQuNjA0IDE0NC41NzcgMjQ4LjkwMyAxMzcuODM3IEwgMjQ4LjkwMyAxMzcuMjc4IEwgMjQ5Ljg5MyAxMzcuMDYyIEwgMjcyLjk5IDU3LjYyNCBaIiBzdHlsZT0iIi8+CiAgPHBhdGggZmlsbD0iIzgyZDhiYiIgZD0iTSAxNzEuMjcxIDcyLjA3NSBDIDE4Ni44MTMgODIuNzk2IDIwNS4yOTIgODguNDQ1IDIyNC4xNzIgODguMjQ3IEMgMjM4LjY1IDg4LjA1OSAyNTIuOTc4IDg1LjMwNyAyNjYuNDk0IDgwLjExOCBMIDI3Mi45OSA1Ny42MjQgQyAyNTguODE3IDYzLjMzMSAyNDMuNzA4IDY2LjM2NCAyMjguNDMxIDY2LjU3IEMgMjA5LjU4NCA2Ni44MDggMTkxLjEyMyA2MS4yMjIgMTc1LjU3IDUwLjU2OSBMIDE1MS42MTQgMTMyLjg5IEwgMTUzLjI5MiAxMzMuODggTCAxNzEuMjcxIDcyLjA3NSBaIiBzdHlsZT0iIi8+CiAgPHBhdGggZmlsbD0iIzhkNmM5ZiIgZD0iTSAxMjUuNDIyIDE0MC44OSBDIDEyMi4zNjcgMTM5LjA0MSAxMTkuMDU1IDEzNy4wNjIgMTE1LjYxNSAxMzUuMjEzIEMgMTAzLjk3NSAxMjguOTA1IDkxLjAwMSAxMjUuNDU1IDc3Ljc2NiAxMjUuMTQ4IEMgNzYuMDg4IDEyNS4xNDggNzQuNDEgMTI1LjE0OCA3Mi43MzQgMTI1LjE0OCBDIDU5Ljk0MSAxMjYuMzU4IDQ3LjM0NiAxMjkuMTMxIDM1LjIyOCAxMzMuNDA2IEMgMzIuOTA3IDEzNC4yNjcgMzAuNTQxIDEzNS4xMjYgMjguMDg5IDEzNi4xMTcgQyAyNi44NTcgMTM2LjYwNyAyNS45MjEgMTM3LjYzOSAyNS41NTIgMTM4LjkxMiBMIDIuMDI2IDIxOS43MjggQyAxLjA4NiAyMjIuOTA0IDMuOTM2IDIyNS45MDUgNy4xNTQgMjI1LjEzMSBDIDcuMzI2IDIyNS4wODggNy40OTUgMjI1LjAzOCA3LjY1OCAyMjQuOTc1IEMgMjAuOTc2IDIxOS42NjEgMzUuMTMxIDIxNi43NDkgNDkuNDY2IDIxNi4zNzQgQyA2Ni4yNDEgMjE2LjY2MyA4Mi41NDMgMjIxLjk4MyA5Ni4yNjEgMjMxLjY0MiBDIDk4LjY3NSAyMzMuMTkzIDEwMS45MDMgMjMxLjk4OSAxMDIuNzEyIDIyOS4yMzQgQyAxMDguNjkgMjA5LjA2MiAxMjMuMDEyIDE2MC40MTggMTI3LjMxMyAxNDUuNzA4IEMgMTI3LjgyOCAxNDMuODYxIDEyNy4wNTUgMTQxLjg5NCAxMjUuNDIyIDE0MC44OSBaIE0gOTYuMDQ1IDIyMS40MDYgQyA4Mi4xNDQgMjEyLjY0MSA2Ni4wNzEgMjA3LjkzNCA0OS42MzcgMjA3LjgxNSBDIDM3LjEwNCAyMDcuOTYxIDI0LjY3MSAyMTAuMDUyIDEyLjc3NyAyMTQuMDA5IEwgMzMuMjUgMTQzLjQyOSBMIDM4LjExIDE0MS42MjIgQyA0OS41MzIgMTM3LjU5MSA2MS40MDcgMTM0Ljk3NyA3My40NjQgMTMzLjgzOCBDIDc0LjkyNiAxMzMuODM4IDc2LjM0NiAxMzMuODM4IDc3Ljc2NiAxMzMuODM4IEMgODkuNjA4IDEzNC4xNDIgMTAxLjIwOCAxMzcuMjUyIDExMS42MTYgMTQyLjkxMyBDIDExMy44MDggMTQ0LjExNyAxMTUuOTE1IDE0NS4zNjMgMTE4LjEwOSAxNDYuNjExIEMgMTEzLjQyMSAxNjIuMzk2IDEwMi4yMzggMjAwLjU0NSA5Ni4wNDUgMjIxLjQwNiBaIE0gMzkuMjcyIDExNS4zMDEgQyA1My4wMjkgMTA5LjY3OCA2Ny42ODUgMTA2LjU3NCA4Mi41MzkgMTA2LjEzOSBDIDk4LjY3OSAxMDYuNjQ1IDExNC4zMTggMTExLjg2NCAxMjcuNTI5IDEyMS4xNDkgQyAxMjguMjIxIDEyMS41OTcgMTI5LjAyOCAxMjEuODM1IDEyOS44NSAxMjEuODM3IEMgMTMwLjM2NSAxMjEuODQzIDEzMC44NzUgMTIxLjc1NCAxMzEuMzU3IDEyMS41NzggQyAxMzIuNjIxIDEyMS4xMTEgMTMzLjU5MSAxMjAuMDc2IDEzMy45ODEgMTE4Ljc4MyBMIDE1OC4xMDggMzYuNTA1IEMgMTU4LjY3MyAzNC41OTcgMTU3Ljg1NCAzMi41NSAxNTYuMTMgMzEuNTU4IEMgMTQ2Ljg5NSAyNi4xNzggMTM3LjA4NCAyMS44NSAxMjYuODg0IDE4LjY1NiBDIDExOS45NDkgMTcuMDE4IDExMi44NDggMTYuMTgxIDEwNS43MjMgMTYuMTYxIEMgODkuNjk0IDE2Ljg1OSA3My45MjggMjAuNDU5IDU5LjE4NiAyNi43ODUgQyA1Ny45NTQgMjcuMjc1IDU3LjAxOCAyOC4zMDcgNTYuNjQ3IDI5LjU4IEwgMzMuNTk1IDExMC4wOTYgQyAzMi42OTMgMTEzLjI4MiAzNS41NzcgMTE2LjI0OCAzOC43ODggMTE1LjQzOCBDIDM4LjkzNyAxMTUuMzk5IDM5LjA4NCAxMTUuMzUzIDM5LjIyOSAxMTUuMzAxIEwgMzkuMjcyIDExNS4zMDEgWiBNIDY0LjM0NyAzNC4wMTEgQyA3Ny41MiAyOC41MjMgOTEuNTU0IDI1LjM5MyAxMDUuODA4IDI0Ljc2MiBDIDExMi4yMTkgMjQuNzQyIDExOC42MTIgMjUuNDQ4IDEyNC44NjEgMjYuODcyIEMgMTMzLjIzMiAyOS40ODcgMTQxLjI5NSAzMy4wMDYgMTQ4LjkwNCAzNy4zNjQgTCAxNDUuMzM0IDQ5LjUzNyBDIDEzOC4wNjIgNDUuNTc2IDEzMC4zOTMgNDIuMzkgMTIyLjQ1MyA0MC4wMzIgQyAxMTUuNTU2IDM4LjQ0NyAxMDguNSAzNy42NTUgMTAxLjQyMSAzNy42NjcgQyA5MC43MTcgMzcuOTgxIDgwLjEwNyAzOS43NzYgNjkuODk1IDQyLjk5OSBDIDY2LjcxNyA0My45NTkgNjUuNzY5IDQ4IDY4LjE5MSA1MC4yNzMgQyA2OS4zMTQgNTEuMzI4IDcwLjkxNSA1MS43MDMgNzIuMzg5IDUxLjI1NyBDIDgxLjgxOSA0OC4yNjIgOTEuNjE4IDQ2LjU4NSAxMDEuNTA4IDQ2LjI2OCBDIDEwNy45MTcgNDYuMjQ2IDExNC4zMSA0Ni45NTQgMTIwLjU2MiA0OC4zNzUgQyAxMjguMzE4IDUwLjc4MSAxMzUuOCA1My45OTYgMTQyLjg4NCA1Ny45NjcgTCAxMjcuMjcxIDExMC43ODMgQyAxMTMuODU4IDEwMi4zMzMgOTguMzkgOTcuNzA3IDgyLjUzOSA5Ny40MDcgQyA2OS40NTMgOTcuNjQ1IDU2LjQ4OCA5OS45NjggNDQuMTMyIDEwNC4yOSBMIDY0LjM0NyAzNC4wMTEgWiBNIDI3NS45MTQgNTQuNDM5IEMgMjc0Ljc0NiA1My4zODkgMjczLjA5NyA1My4wNiAyNzEuNjEyIDUzLjU4IEMgMjU3LjkyOSA1OS4wNzQgMjQzLjM0NyA2MS45OSAyMjguNjAzIDYyLjE4MSBDIDIxMC42MDQgNjIuMzUxIDE5Mi45ODggNTYuOTc0IDE3OC4xNTIgNDYuNzg0IEMgMTc1Ljc0IDQ1LjExIDE3Mi4zOTggNDYuMjkgMTcxLjU3MSA0OS4xMDcgTCAxNDcuNDg2IDEzMS42ODYgQyAxNDYuOTExIDEzMy41NDEgMTQ3LjY1MiAxMzUuNTUgMTQ5LjI5MSAxMzYuNTkxIEMgMTY1LjMyNCAxNDcuMDkxIDE4NC4wNjEgMTUyLjcxIDIwMy4yMjcgMTUyLjc2MiBDIDIxOS41OTQgMTUyLjUyIDIzNS43MjIgMTQ4Ljc5OCAyNTAuNTM4IDE0MS44MzggQyAyNTEuOTQ4IDE0MS4wMDUgMjUzLjA4NSAxMzkuNzc5IDI1My44MDcgMTM4LjMxMSBMIDI3Ny4yOTEgNTguODI4IEMgMjc3LjcxNyA1Ny4yMjIgMjc3LjE4MiA1NS41MTQgMjc1LjkxNCA1NC40MzkgWiBNIDI0Ni4yODEgMTMzLjgzOCBDIDI0NS45NTQgMTM0LjA4MiAyNDUuNjY0IDEzNC4zNyAyNDUuNDIgMTM0LjY5NyBDIDIxMy45MzYgMTQ4LjM3NCAxODMuNTI4IDE0Ni45OTkgMTU2Ljg2MiAxMzAuOTU2IEwgMTcyLjM0NiA3Ny42MjMgQyAxODQuMjI4IDg1LjE1NSAxOTcuNjQ1IDg5LjkzMSAyMTEuNjE0IDkxLjYwMSBMIDIxMi4xMzEgOTEuNjAxIEMgMjE1LjQ0IDkxLjggMjE3LjcyNSA4OC4zNCAyMTYuMjQzIDg1LjM3MyBDIDIxNS41NTMgODMuOTk2IDIxNC4xODIgODMuMDkgMjEyLjY0NyA4MyBDIDE5OS4xMDUgODEuMzg0IDE4Ni4xNDQgNzYuNTYyIDE3NC44NCA2OC45MzUgTCAxNzguMjgxIDU3LjEwOCBDIDE5My40OTUgNjYuMjA5IDIxMC45MTcgNzAuOTU2IDIyOC42NDUgNzAuODI3IEMgMjQxLjU5IDcwLjcxNiAyNTQuNDM0IDY4LjU2OCAyNjYuNzEgNjQuNDYyIEwgMjQ2LjI4MSAxMzMuODM4IFogTSAyMzkuNzQzIDE2My43NzEgQyAyMjYuMDk0IDE2OC4zNTUgMjExLjgxNiAxNzAuNzkzIDE5Ny40MjEgMTcwLjk5NyBDIDE3OS4yNTMgMTcxLjQwMiAxNjEuNDA5IDE2Ni4xNDEgMTQ2LjM2NyAxNTUuOTQ1IEMgMTQzLjk4OSAxNTQuMTQgMTQwLjU0MyAxNTUuMjQ1IDEzOS42NTggMTU4LjA5NCBMIDExNi4yMTggMjM5LjgxNCBDIDExNS43MTIgMjQxLjY3MSAxMTYuNTAyIDI0My42NCAxMTguMTUyIDI0NC42MzIgQyAxMjcuMjI3IDI0OS43OTIgMTUwLjI4MSAyNjEuODM2IDE2OC43NzYgMjYxLjgzNiBDIDE4Ni41MDEgMjYxLjI3NSAyMDMuOTUxIDI1Ny4zMDMgMjIwLjE3MyAyNTAuMTM3IEMgMjIxLjQwNSAyNDkuNjQ1IDIyMi4zNDEgMjQ4LjYxNSAyMjIuNzEgMjQ3LjM0IEwgMjQ1LjIwNCAxNjkuMDYzIEMgMjQ2LjEzIDE2NS44ODMgMjQzLjI2NiAxNjIuODk2IDI0MC4wNDkgMTYzLjY4NSBDIDIzOS45NDcgMTYzLjcxMSAyMzkuODQ0IDE2My43MzkgMjM5Ljc0MyAxNjMuNzcxIFogTSAyMjEuMzc3IDIyMC43MTggTCAyMjEuMzc3IDIxOC4zMSBDIDIyMS4zNzcgMjE0Ljk5OSAyMTcuNzkzIDIxMi45MyAyMTQuOTI2IDIxNC41ODUgQyAyMTMuNTk1IDIxNS4zNTIgMjEyLjc3NiAyMTYuNzczIDIxMi43NzYgMjE4LjMxIEwgMjEyLjc3NiAyMjYuOTExIEMgMjEyLjc3NiAyMjkuMjg3IDIxNC43IDIzMS4yMTMgMjE3LjA3NiAyMzEuMjEzIEMgMjE3LjU0NSAyMzEuMjAzIDIxOC4wMTEgMjMxLjExNCAyMTguNDUzIDIzMC45NTUgTCAyMTUuMDEyIDI0Mi45NTQgQyAyMDAuNDA2IDI0OS4yMzQgMTg0Ljc1MiAyNTIuNzIxIDE2OC44NjEgMjUzLjIzMyBDIDE1My45MzggMjUzLjIzMyAxMzQuNDUyIDI0My42ODYgMTI1LjQ2NCAyMzguODI2IEwgMTI4LjU2MiAyMjguMTU4IEMgMTI5LjI4OCAyMjguNzI0IDEzMC4xNzcgMjI5LjA0MSAxMzEuMDk5IDIyOS4wNjEgQyAxMzMuNDc0IDIyOS4wNjEgMTM1LjQgMjI3LjEzNyAxMzUuNCAyMjQuNzYyIEwgMTM1LjQgMjE2LjE1OCBDIDEzNS4zOCAyMTQuNTg5IDEzNC41MDUgMjEzLjE1NiAxMzMuMTE5IDIxMi40MTcgTCAxNDYuNDk2IDE2Ni4yMjQgQyAxNjEuOTMyIDE3NS4yNSAxNzkuNTQzIDE3OS44NzYgMTk3LjQyMSAxNzkuNiBDIDIxMC4wMzEgMTc5LjQ4MyAyMjIuNTcxIDE3Ny42OSAyMzQuNzA5IDE3NC4yNjYgTCAyMjEuMzc3IDIyMC43MTggWiIgc3R5bGU9IiIvPgogIDxwYXRoIGZpbGw9IiM4ZDZjOWYiIGQ9Ik0gMjI3LjE4MyA4OC4xMTggQyAyMjcuMzQyIDkwLjM3NSAyMjkuMjIyIDkyLjEyMyAyMzEuNDg1IDkyLjExNyBMIDIzMS43ODUgOTIuMTE3IEMgMjM1LjkzOSA5MS44MTggMjQwLjA3NCA5MS4zMDIgMjQ0LjE3MiA5MC41NjggQyAyNDcuNDgzIDg5Ljk4OSAyNDguOTI1IDg2LjA0MyAyNDYuNzY5IDgzLjQ2NSBDIDI0NS43NjcgODIuMjcgMjQ0LjIwNCA4MS42OTcgMjQyLjY2NyA4MS45NjcgQyAyMzguODY4IDgyLjY0MSAyMzUuMDM0IDgzLjExNSAyMzEuMTg0IDgzLjM4NyBDIDIyOC43NSA4My41NDQgMjI2LjkzNSA4NS42OTIgMjI3LjE4MyA4OC4xMTggWiBNIDI3LjgzMSAxODAuNjc1IEMgMjUuNDU1IDE4MC42NzUgMjMuNTI5IDE4Mi42MDEgMjMuNTI5IDE4NC45NzcgTCAyMy41MjkgMTkzLjU3OCBDIDIzLjUyOSAxOTYuODg5IDI3LjExMyAxOTguOTU4IDI5Ljk4MSAxOTcuMzAzIEMgMzEuMzEyIDE5Ni41MzQgMzIuMTMzIDE5NS4xMTQgMzIuMTMzIDE5My41NzggTCAzMi4xMzMgMTg0Ljk3NyBDIDMyLjEzMyAxODIuNjAxIDMwLjIwNyAxODAuNjc1IDI3LjgzMSAxODAuNjc1IFogTSA0OS4zMzcgMTc4LjUyNSBDIDQ2Ljk2MSAxNzguNTI1IDQ1LjAzNSAxODAuNDUxIDQ1LjAzNSAxODIuODI1IEwgNDUuMDM1IDE5MS40MjggQyA0NS4wMzUgMTk0LjczOSA0OC42MTkgMTk2LjgwOCA1MS40ODcgMTk1LjE1MyBDIDUyLjgxOCAxOTQuMzg0IDUzLjYzNiAxOTIuOTY1IDUzLjYzNiAxOTEuNDI4IEwgNTMuNjM2IDE4Mi44MjUgQyA1My42MzYgMTgwLjQ1MSA1MS43MSAxNzguNTI1IDQ5LjMzNyAxNzguNTI1IFogTSA3MC44NDEgMTgwLjY3NSBDIDY4LjQ2NSAxODAuNjc1IDY2LjU0MSAxODIuNjAxIDY2LjU0MSAxODQuOTc3IEwgNjYuNTQxIDE5My41NzggQyA2Ni41NDEgMTk2Ljg4OSA3MC4xMjUgMTk4Ljk1OCA3Mi45OTIgMTk3LjMwMyBDIDc0LjMyMyAxOTYuNTM0IDc1LjE0MiAxOTUuMTE0IDc1LjE0MiAxOTMuNTc4IEwgNzUuMTQyIDE4NC45NzcgQyA3NS4xNDIgMTgyLjYwMSA3My4yMTYgMTgwLjY3NSA3MC44NDEgMTgwLjY3NSBaIE0gOTIuMzQ2IDE4OS4yNzggQyA4OS45NzEgMTg5LjI3OCA4OC4wNDUgMTkxLjIwMiA4OC4wNDUgMTkzLjU3OCBMIDg4LjA0NSAyMDIuMTgxIEMgODguMDQ1IDIwNS40OTIgOTEuNjI4IDIwNy41NjEgOTQuNDk2IDIwNS45MDYgQyA5NS44MjcgMjA1LjEzNyA5Ni42NDggMjAzLjcxOCA5Ni42NDggMjAyLjE4MSBMIDk2LjY0OCAxOTMuNTc4IEMgOTYuNjQ4IDE5MS4yMDIgOTQuNzIyIDE4OS4yNzggOTIuMzQ2IDE4OS4yNzggWiBNIDE1Mi41NiAyMjAuNDYgQyAxNTAuMTg1IDIyMC40NiAxNDguMjU5IDIyMi4zODYgMTQ4LjI1OSAyMjQuNzYyIEwgMTQ4LjI1OSAyMzMuMzYzIEMgMTQ4LjI1OSAyMzYuNjc0IDE1MS44NDQgMjM4Ljc0MyAxNTQuNzEyIDIzNy4wODcgQyAxNTYuMDQxIDIzNi4zMTkgMTU2Ljg2MiAyMzQuODk5IDE1Ni44NjIgMjMzLjM2MyBMIDE1Ni44NjIgMjI0Ljc2MiBDIDE1Ni44NjIgMjIyLjM4NiAxNTQuOTM2IDIyMC40NiAxNTIuNTYgMjIwLjQ2IFogTSAxNzQuMDY2IDIyMy42ODUgQyAxNzEuNjkgMjIzLjY4NSAxNjkuNzY0IDIyNS42MTEgMTY5Ljc2NCAyMjcuOTg2IEwgMTY5Ljc2NCAyMzYuNTg5IEMgMTY5Ljc2NCAyMzkuODk5IDE3My4zNDggMjQxLjk3IDE3Ni4yMTYgMjQwLjMxNCBDIDE3Ny41NDcgMjM5LjU0NiAxNzguMzY4IDIzOC4xMjYgMTc4LjM2OCAyMzYuNTg5IEwgMTc4LjM2OCAyMjcuOTg2IEMgMTc4LjM2OCAyMjUuNjExIDE3Ni40NDIgMjIzLjY4NSAxNzQuMDY2IDIyMy42ODUgWiBNIDE5MS4yNyAyMjQuNzYyIEwgMTkxLjI3IDIzMy4zNjMgQyAxOTEuMjcgMjM2LjY3NCAxOTQuODU0IDIzOC43NDMgMTk3LjcyMiAyMzcuMDg3IEMgMTk5LjA1MyAyMzYuMzE5IDE5OS44NzEgMjM0Ljg5OSAxOTkuODcxIDIzMy4zNjMgTCAxOTkuODcxIDIyNC43NjIgQyAxOTkuODcxIDIyMS40NSAxOTYuMjg4IDIxOS4zODEgMTkzLjQyIDIyMS4wMzcgQyAxOTIuMDg5IDIyMS44MDUgMTkxLjI3IDIyMy4yMjUgMTkxLjI3IDIyNC43NjIgWiIgc3R5bGU9IiIvPgo8L3N2Zz4=

// ==/UserScript==


(function() {
    if(/^(https?:\/\/)?(cn|www)\.bing\.com\/orgid\/idtoken\/nosignin$/i.test(location.href)){
       return
    }
    if(location.href.indexOf('bing.com/search?q=') > 0 ){
        addSearchStyle();
    }else{
        addIndexStyle();
        bing_index();
    }

})();
window.onload=function(){
    if(/^(https?:\/\/)?(cn|www)\.bing\.com\/orgid\/idtoken\/nosignin$/i.test(location.href)){
       return
    }
    if(location.href.indexOf('bing.com/search?q=') > 0 ){
        $('#b_content').fadeIn(200)
        bing_ad()
        bing_search();
    }
}

function bing_index(){
    let saveChange = function(){
        if(document.readyState != 'complete'){
            setTimeout(saveChange,200)
            return
        }
        let jqSbox=$('.sbox')
        jqSbox.hide()

        let divNode = document.createElement("div")
        divNode.id='saveDiyLogo'
        divNode.style='height:120px;text-align:center;'
        jqSbox.prepend(divNode)
        divNode = document.getElementById("saveDiyLogo")

        let mmoTimes = 0
        let mmoPerTimes = 0
        let mmoTimerId = 0

        let mmo = new MutationObserver(function (mutations,observe) {

            if(divNode.getInnerHTML() == ''){
               if(mmoTimerId > 0){
                   return
               }
               mmoTimerId = setInterval(function(){
                   if(mmoPerTimes>0 && mmoTimes > 0 && mmoPerTimes == mmoTimes){
                       clearInterval(mmoTimerId)
                       observe.disconnect()
                       divNode.innerHTML='<svg id="logoo" style="width:55%" class="logo" viewBox="0 0 154 28" aria-label="Bing"><svg class="squares"><path class="top_l"fill="#f26522" d="M11.35 0H0v11.35h11.35z"></path><path class="top_r" fill="#8dc63f" d="M23.88 0H12.53v11.35h11.35z"></path><path class="bom_l" fill="#00aeef" d="M11.35 12.53H0v11.35h11.35z"></path><path class="bom_r" fill="#ffc20e" d="M23.88 12.53H12.53v11.35h11.35z"></path></svg><path class="ms_text" fill="#666" d="M46.55 4.77V19.1h-2.48V7.87h-.05L39.59 19.1h-1.65L33.37 7.87h-.03V19.1h-2.3V4.77h3.57l4.11 10.62h.06l4.35-10.62zm2.08 1.1c0-.4.15-.74.44-1.01.29-.27.63-.4 1.03-.4a1.44 1.44 0 011.48 1.4c0 .4-.14.73-.43 1-.28.26-.64.4-1.05.4s-.76-.14-1.04-.41c-.29-.27-.43-.6-.43-.99zm2.67 2.96V19.1h-2.42V8.83zm7.34 8.51c.35 0 .75-.08 1.18-.24.44-.17.84-.39 1.2-.66v2.24c-.38.22-.82.4-1.3.5a7.2 7.2 0 01-1.62.17 4.97 4.97 0 01-3.7-1.43A4.99 4.99 0 0153 14.26c0-1.65.48-3.01 1.45-4.08.96-1.07 2.33-1.6 4.1-1.6a5.62 5.62 0 012.48.58v2.31a5 5 0 00-1.14-.63 3.32 3.32 0 00-1.2-.23c-.95 0-1.72.31-2.3.93s-.89 1.46-.89 2.51c0 1.04.29 1.85.85 2.43.56.58 1.33.86 2.3.86zm9.27-8.68a2.54 2.54 0 01.91.14v2.45a2.56 2.56 0 00-1.44-.4c-.6 0-1.1.26-1.5.76s-.62 1.27-.62 2.3v5.2h-2.42V8.82h2.42v1.62h.04c.22-.56.56-1 1-1.31.45-.32.98-.48 1.6-.48zm1.04 5.46c0-1.7.48-3.05 1.44-4.04s2.3-1.49 4-1.49c1.6 0 2.85.48 3.76 1.43s1.35 2.25 1.35 3.88c0 1.66-.48 2.99-1.44 3.97a5.22 5.22 0 01-3.92 1.48c-1.59 0-2.85-.47-3.79-1.4a5.17 5.17 0 01-1.4-3.83zm2.52-.08c0 1.07.24 1.89.73 2.46s1.18.84 2.09.84c.87 0 1.54-.28 2-.84s.7-1.41.7-2.52c0-1.1-.24-1.94-.72-2.5a2.48 2.48 0 00-2-.85c-.89 0-1.57.3-2.06.88-.5.6-.74 1.44-.74 2.53zm11.63-2.51c0 .35.1.62.33.82.22.2.7.44 1.46.74.96.39 1.64.82 2.03 1.3.39.49.58 1.07.58 1.76 0 .96-.37 1.74-1.11 2.33s-1.75.88-3.01.88a7.25 7.25 0 01-2.73-.56v-2.37c.44.3.91.55 1.42.73.5.18.97.27 1.38.27.55 0 .95-.08 1.21-.23.26-.16.39-.41.39-.77 0-.34-.14-.62-.4-.85-.28-.23-.79-.5-1.54-.8-.89-.37-1.52-.79-1.9-1.26s-.56-1.05-.56-1.77c0-.93.37-1.7 1.1-2.29.75-.6 1.7-.9 2.87-.9a7.06 7.06 0 012.33.44v2.3c-.32-.22-.7-.4-1.12-.56a3.74 3.74 0 00-1.27-.23c-.46 0-.82.1-1.07.27a.86.86 0 00-.4.75zm5.44 2.59c0-1.7.48-3.05 1.44-4.04a5.3 5.3 0 014-1.49c1.6 0 2.86.48 3.76 1.43s1.35 2.25 1.35 3.88c0 1.66-.48 2.99-1.44 3.97a5.22 5.22 0 01-3.91 1.48c-1.6 0-2.86-.47-3.8-1.4a5.17 5.17 0 01-1.4-3.83zm2.52-.08c0 1.07.24 1.89.73 2.46s1.18.84 2.1.84c.87 0 1.54-.28 2-.84s.7-1.41.7-2.52c0-1.1-.25-1.94-.72-2.5a2.48 2.48 0 00-2-.85c-.89 0-1.58.3-2.07.88a3.8 3.8 0 00-.74 2.53zm16.06-3.23h-3.6v8.3h-2.45v-8.3h-1.72V8.83h1.72V7.4a3.56 3.56 0 013.75-3.69c.3 0 .56.02.78.05.23.03.43.08.6.14v2.09a2.42 2.42 0 00-1.1-.27c-.51 0-.9.16-1.18.47-.27.32-.4.78-.4 1.4v1.25h3.6V6.53l2.42-.74v3.05H112v1.97h-2.45v4.8c0 .64.12 1.09.35 1.35.23.26.59.39 1.08.39a2.35 2.35 0 001.02-.34v2c-.15.09-.4.17-.76.24s-.7.1-1.06.1c-1.01 0-1.78-.26-2.29-.8-.5-.55-.76-1.36-.76-2.46v-5.28z"></path><path class="b_text" fill="#666" d="M117.5 19.24V5.07h4.5c1.37 0 2.46.3 3.26.9.8.6 1.2 1.38 1.2 2.34 0 .8-.23 1.5-.68 2.1a3.68 3.68 0 01-1.89 1.26v.04c.98.11 1.75.47 2.33 1.09.59.6.88 1.4.88 2.37 0 1.21-.48 2.2-1.43 2.94s-2.16 1.13-3.62 1.13zm2.35-12.28v4.03h1.52c.82 0 1.46-.2 1.92-.57.47-.4.7-.94.7-1.64 0-1.22-.81-1.82-2.43-1.82zm0 5.92v4.48h2c.88 0 1.56-.2 2.03-.6.48-.41.72-.97.72-1.68 0-1.47-1.01-2.2-3.05-2.2zM129.97 7c-.37 0-.7-.13-.96-.37-.27-.24-.4-.55-.4-.93s.13-.69.4-.94.59-.37.97-.37.71.12.98.37.4.57.4.94c0 .36-.13.66-.4.92-.27.25-.6.38-.99.38zm1.14 12.24h-2.29V9.12h2.3zM142.46 19.24h-2.29v-5.7c0-1.9-.67-2.84-2-2.84-.7 0-1.28.27-1.74.8a2.9 2.9 0 00-.68 1.97v5.77h-2.3V9.12h2.3v1.68h.04a3.6 3.6 0 013.28-1.92c1.1 0 1.94.36 2.52 1.08.58.71.87 1.74.87 3.1zM153.81 18.43c0 3.71-1.86 5.57-5.6 5.57a8.35 8.35 0 01-3.45-.66v-2.1c1.1.64 2.16.95 3.15.95 2.4 0 3.61-1.18 3.61-3.55v-1.1h-.04a3.71 3.71 0 01-3.42 1.93 3.72 3.72 0 01-2.98-1.34 5.49 5.49 0 01-1.13-3.63c0-1.72.4-3.08 1.22-4.1s1.92-1.52 3.34-1.52c1.33 0 2.32.55 2.97 1.64h.04v-1.4h2.3zm-2.27-3.82v-1.32c0-.71-.24-1.32-.71-1.82a2.3 2.3 0 00-1.76-.76c-.87 0-1.55.33-2.04.97a4.34 4.34 0 00-.74 2.69c0 1 .24 1.79.7 2.39.48.6 1.1.89 1.88.89.8 0 1.44-.29 1.93-.85.5-.58.74-1.3.74-2.2z"></path></svg>'
                   }
                   mmoPerTimes = mmoTimes
               },200)
            }else if(divNode.getInnerHTML() != ''){
               mmoTimes++
               divNode.innerHTML=''
            }
        });
    mmo.observe(divNode,{ childList: true});
    jqSbox.fadeIn(200)
    }
    saveChange()
}

//Bing搜索页美化
function bing_search(){
    //百度热搜
    getNews()
    // 更换网站图标
    setTimeout(()=>{
        const imgList = document.getElementsByClassName("rms_img")
        for (let i = 0; i < imgList.length; i++) {
            if(imgList[i].alt ==="全球 Web 图标"&&imgList[i].src.indexOf("&w=")){
                imgList[i].src=imgList[i].src.split("&w=")[0]
            }
        }
    },300)

    const sh_favicon = document.querySelector(".sh_favicon")
    if(sh_favicon) sh_favicon.style.setProperty("visibility", "visible", "important");
    //政府tag
    $(".b_title").each(function(i){
        if($(this).context.firstChild.href!=undefined && $(this).context.firstChild.href.indexOf(".gov")>0){
            var a = document.createElement("span")
            a.innerText="政府"
            a.className = "tag tag-gov"
            $(this).context.appendChild(a)
        }
    })

}

function getNews(){
    GM_xmlhttpRequest({
        method: "get",
        url: "https://api.geekzwzs.cn/resou",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },

        onload: function(data){
            const result = JSON.parse(data.response).data[0];
            const title = `<div class="news_type">${result.text}</div>`;
            const list = result.value.slice(0, 15).map((v,i)=>`<div class="news_item"><span class="news_index">${i+1}</span><a class="news_link" href=${v.rawUrl}>${v.wordQuery}</a>${v.hotTag==3?'<span class="tag tag-hot">热</span>':''}</div>`)
            let hotSearch = document.createElement("div");
            hotSearch.innerHTML=title+list.join("");
            hotSearch.className="hot_search";
            $("#b_content main").append(hotSearch);
        },
        onerror: function(response){
            console.log("请求失败");
        }
    });

}

// 添加首页 css样式
function addIndexStyle() {
    let css = `
     .sbox{display:none;top:25%}
     .mic_cont,#est_cn,#est_en{display:none!important}
     .logo_cont{filter:grayscale(1)}
     .img_cont{background-color:aliceblue!important}
     .img_uhd{background-color:aliceblue!important}
     #footer{display:none}
     #est_switch{display:none}
    `
    GM_addStyle(css)
}

// 添加搜索页 css样式
function addSearchStyle() {
    let css = `
       .news_type{font-size: 17px;color: #222;margin-bottom: 15px;font-weight: 600;}
       .hot_search{position: absolute; top: 220px;left: 1150px; width: 300px;}
       .news_index{width: 25px;text-align: center; display: inline-block;color:#9195A3}
       .news_item:nth-child(-n+4) .news_index{color:#FE2D46}
       .news_item{padding:8px 0;font-size: 14px;}
       #b_header{background-color:#fff!important;position:sticky;z-index:99999;top:0;box-shadow: 0px 3px 6px #eee;}
       #b_results{width:850px}
       body{font-size:13px}
       .sh_favicon{visibility:visible!important}
       #est_switch .est_unselected::after{background:none;border:none}
       #est_switch .est_selected::after{background-color:#fff}
       #b_content{display:none}
       .dlCollapsedCnt,#b_algospacing,.b_vidAns,#b_footer,.mic_cont,.b_ad,#LGPopDomainsContainer,#textDeeplinksWidgetContainer,#wikiWidgetContainer,#b_context,.b_nwsAns,#lgImgAnsContainer,.pagereco_anim,.b_mop,.b_bop,.pageRecoContainer,.mic_cont{display:none!important}
       a>strong{color:#2440b3!important}
       p>strong{color:#f73131!important}
       li.b_algo a{color:#2440b3!important}
       cite{color:#70757a!important;font-size: 13px;}
       .tag{color:#fff;background-color:#F60; border-radius: 2px;font-size: 12px;padding: 1px 2px;margin-left: 3px;}
       .tag-gov{background-color:#355cf9;}
    `
    GM_addStyle(css)
}


function bing_ad() {
    $(".b_ad").remove();
    $(".b_algo").each(function() {
        if ($(this).children(":first")[0].nodeName=="H2"){
            $(this).hide();
        }
    })

}
