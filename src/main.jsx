import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Bell,
  ChevronDown,
  CircleUserRound,
  GripVertical,
  Info,
  Plus,
  Search,
  Settings2,
  Upload,
  X,
} from 'lucide-react'
import './styles.css'

import iconHand from '../pic/手杀.png'
import iconYijiang from '../pic/一将.png'
import iconOl from '../pic/OL.png'
import iconMingjiang from '../pic/名将.png'
import iconXiyou from '../pic/西游.png'
import iconZhijian from '../pic/指间.png'
import iconSanwu from '../pic/三武.png'
import iconHuanle from '../pic/欢乐.png'
import iconNuyan from '../pic/怒焰.png'
import iconLangren from '../pic/狼人.png'

const issuer = '杭州游卡网络技术有限公司'

const seedGames = [
  { id: 1, name: '三国杀移动版', appid: '10100001', icon: iconHand, updatedAt: '2025-05-28 14:01:57', updatedBy: '系统' },
  { id: 2, name: '三国杀一将成名', appid: '10100011', icon: iconYijiang, updatedAt: '2025-05-21 10:16:34', updatedBy: '王建' },
  { id: 3, name: '三国杀OL', appid: '10100002', icon: iconOl, updatedAt: '2025-05-18 20:18:25', updatedBy: '系统' },
  { id: 4, name: '三国杀名将传', appid: '10100005', icon: iconMingjiang, updatedAt: '2025-05-12 11:52:41', updatedBy: '系统' },
  { id: 5, name: '自在西游', appid: '10100032', icon: iconXiyou, updatedAt: '2025-05-08 09:36:20', updatedBy: '王建' },
  { id: 6, name: '指间山海', appid: '10100042', icon: iconZhijian, updatedAt: '2025-05-06 17:28:03', updatedBy: '系统' },
  { id: 7, name: '三国杀武将觉醒', appid: '10100080', icon: iconSanwu, updatedAt: '2025-04-30 15:12:09', updatedBy: '系统' },
  { id: 8, name: '欢乐三国杀', appid: '10100031', icon: iconHuanle, updatedAt: '2025-04-24 13:45:18', updatedBy: '王建' },
  { id: 9, name: '怒焰三国杀', appid: '10100004', icon: iconNuyan, updatedAt: '2025-04-18 20:18:25', updatedBy: '系统' },
  { id: 10, name: '狼人对决', appid: '10100010', icon: iconLangren, updatedAt: '2025-04-10 16:02:37', updatedBy: '系统' },
]

const projectOptions = [
  { id: 11, name: '幻想名将录', appid: '10100086', icon: iconMingjiang, updatedAt: '2025-04-01 12:18:20', updatedBy: '系统' },
  { id: 12, name: '三国云梦录', appid: '10100088', icon: iconYijiang, updatedAt: '2025-04-01 12:18:20', updatedBy: '系统' },
  { id: 13, name: '放置三国', appid: '10100090', icon: iconSanwu, updatedAt: '2025-04-01 12:18:20', updatedBy: '系统' },
  { id: 14, name: '少年名将', appid: '10100091', icon: iconMingjiang, updatedAt: '2025-04-01 12:18:20', updatedBy: '系统' },
  ...seedGames,
]

const appeals = [
  { no: '559561835989208743', account: 'me1*******52', uid: '210362265892', status: '系统审核未通过', time: '2025-03-27 14:01:57' },
  { no: '559561835989208744', account: 'you1*******52', uid: '210362265892', status: '系统审核未通过', time: '2025-03-27 14:01:57' },
]

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [savedGames, setSavedGames] = useState(seedGames)
  const [draftGames, setDraftGames] = useState(seedGames)
  const [dirty, setDirty] = useState(false)
  const [gameModal, setGameModal] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [toast, setToast] = useState('')

  const configuredIds = useMemo(() => new Set(draftGames.map((game) => game.appid)), [draftGames])

  const openDrawer = () => {
    setDraftGames(savedGames)
    setDirty(false)
    setDrawerOpen(true)
  }

  const requestClose = () => {
    if (!dirty) {
      setDrawerOpen(false)
      return
    }
    setConfirm({
      title: '确认关闭',
      body: '关闭后将重置编辑内容，请确认是否关闭。',
      primary: '确认关闭',
      onConfirm: () => {
        setDrawerOpen(false)
        setDirty(false)
        setDraftGames(savedGames)
      },
    })
  }

  const requestSave = () => {
    setConfirm({
      title: '确认保存',
      body: '保存后配置将提交，并预计 5 分钟内同步线上展示，请确认是否保存。',
      primary: '确认保存',
      onConfirm: () => {
        setSavedGames(draftGames)
        setDirty(false)
        setDrawerOpen(false)
        setToast('保存成功，预计 5 分钟内同步线上')
        window.setTimeout(() => setToast(''), 2600)
      },
    })
  }

  const requestDelete = (game) => {
    setConfirm({
      title: '确认删除',
      body: `删除「${game.name}」后需点击抽屉底部“保存”才会正式生效，请确认是否删除该申诉游戏。`,
      primary: '确认删除',
      danger: true,
      onConfirm: () => {
        setDraftGames((list) => list.filter((item) => item.id !== game.id))
        setDirty(true)
      },
    })
  }

  const saveGameModal = (payload) => {
    if (payload.mode === 'create') {
      setDraftGames((list) => [
        ...list,
        {
          ...payload.project,
          id: Date.now(),
          name: payload.name,
          icon: payload.logoPreview || payload.project.icon,
          updatedAt: '2026-05-19 20:00:00',
          updatedBy: '王建',
        },
      ])
    } else {
      setDraftGames((list) =>
        list.map((item) =>
          item.id === payload.original.id
            ? { ...item, name: payload.name, icon: payload.logoPreview || item.icon, updatedAt: '2026-05-19 20:00:00', updatedBy: '王建' }
            : item,
        ),
      )
    }
    setDirty(true)
    setGameModal(null)
  }

  const reorderGame = (dragId, targetId, placement = 'before') => {
    if (dragId === targetId) return

    setDraftGames((list) => {
      const fromIndex = list.findIndex((item) => item.id === dragId)
      const targetIndex = list.findIndex((item) => item.id === targetId)
      if (fromIndex < 0 || targetIndex < 0) return list

      const next = [...list]
      const [moved] = next.splice(fromIndex, 1)
      const adjustedTargetIndex = next.findIndex((item) => item.id === targetId)
      const insertIndex = placement === 'after' ? adjustedTargetIndex + 1 : adjustedTargetIndex
      next.splice(insertIndex, 0, moved)
      return next
    })
    setDirty(true)
  }

  return (
    <div className="app">
      <Topbar />
      <div className="workspace">
        <Sidebar />
        <main className="main">
          <section className="page-head">
            <h1>申诉审核</h1>
            <button className="primary-btn page-action" onClick={openDrawer}>
              <Plus size={14} />
              游戏接入配置
            </button>
          </section>
          <Filters games={savedGames} />
          <AppealTable games={savedGames} />
        </main>
      </div>

      {drawerOpen && (
        <GameDrawer
          games={draftGames}
          onClose={requestClose}
          onCancel={requestClose}
          onSave={requestSave}
          onCreate={() => setGameModal({ mode: 'create' })}
          onEdit={(game) => setGameModal({ mode: 'edit', game })}
          onDelete={requestDelete}
          onReorder={reorderGame}
        />
      )}

      {gameModal && (
        <GameModal
          mode={gameModal.mode}
          game={gameModal.game}
          configuredIds={configuredIds}
          onCancel={() => setGameModal(null)}
          onSubmit={saveGameModal}
        />
      )}

      {confirm && (
        <ConfirmDialog
          {...confirm}
          onCancel={() => setConfirm(null)}
          onConfirm={() => {
            confirm.onConfirm()
            setConfirm(null)
          }}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

function Topbar() {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">k</span>
        <span>平台服务中心</span>
      </div>
      <nav>
        <span>游戏控制台</span>
        <span>项目管理</span>
        <span className="active">游戏工具</span>
      </nav>
      <div className="top-actions">
        <Bell size={18} />
        <CircleUserRound size={22} />
        <span>王建</span>
        <ChevronDown size={14} />
      </div>
    </header>
  )
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="menu-title">账号管理</div>
      {['注销审核', '申诉审核', '账号查询', '订单查询', '行为日志', '支付风控', '运营管理'].map((item) => (
        <div className={`menu-item ${item === '申诉审核' ? 'selected' : ''}`} key={item}>
          <Settings2 size={14} />
          <span>{item}</span>
        </div>
      ))}
    </aside>
  )
}

function Filters({ games }) {
  return (
    <section className="panel filters">
      <SectionTitle>筛选条件</SectionTitle>
      <div className="filter-grid">
        <Field label="申请单号" placeholder="请输入注销申请单号" />
        <Field label="申诉账号" placeholder="请输入申诉账号" />
        <Field label="申诉状态" value="系统审核未通过" />
        <Field label="申诉游戏" value={games[0]?.name || '请选择申诉游戏'} withIcon={games[0]?.icon} />
        <Field label="审核人" placeholder="请输入审核人" />
        <Field label="审核时间" placeholder="开始时间   ~   结束时间" />
      </div>
      <div className="filter-actions">
        <button className="primary-btn"><Search size={14} />查询</button>
        <button className="secondary-btn">重置</button>
      </div>
    </section>
  )
}

function Field({ label, placeholder, value, withIcon }) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className="input-like">
        {withIcon && <img src={withIcon} alt="" />}
        <span className={value ? '' : 'muted'}>{value || placeholder}</span>
        <ChevronDown size={14} />
      </div>
    </label>
  )
}

function AppealTable({ games }) {
  const first = games[0]
  return (
    <section className="panel appeal-list">
      <SectionTitle>申诉列表</SectionTitle>
      <div className="appeal-table-wrap">
        <table className="base-table">
          <thead>
            <tr>
              <th>申诉单号</th>
              <th>申诉账号</th>
              <th>身份信息</th>
              <th>申诉资料</th>
              <th>提交申诉时间</th>
              <th>申诉状态</th>
              <th>申诉游戏</th>
              <th>充值游戏</th>
              <th>审核人</th>
              <th>审核时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {appeals.map((appeal) => (
              <tr key={appeal.no}>
                <td title={appeal.no}>{appeal.no}</td>
                <td>{appeal.account}<br /><span className="subtext">({appeal.uid})</span></td>
                <td><span className="dot danger" />未通过</td>
                <td><span className="dot danger" />未通过</td>
                <td>{appeal.time}</td>
                <td><span className="status-badge">{appeal.status}</span></td>
                <td>{first && <GameName game={first} />}</td>
                <td>{first && <img className="tiny-icon" src={first.icon} alt="" />}</td>
                <td>系统</td>
                <td>2025-03-28 14:01:57</td>
                <td><a>查看</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function GameDrawer({ games, onClose, onCancel, onSave, onCreate, onEdit, onDelete, onReorder }) {
  const [draggingId, setDraggingId] = useState(null)
  const [dragOverId, setDragOverId] = useState(null)

  const clearDragging = () => {
    setDraggingId(null)
    setDragOverId(null)
  }

  useEffect(() => {
    if (!draggingId) return undefined

    const handlePointerMove = (event) => {
      const row = document.elementFromPoint(event.clientX, event.clientY)?.closest('tr[data-game-id]')
      if (!row) return

      const targetId = Number(row.dataset.gameId)
      if (!targetId || targetId === draggingId) return

      const rect = row.getBoundingClientRect()
      const placement = event.clientY > rect.top + rect.height / 2 ? 'after' : 'before'
      setDragOverId(targetId)
      onReorder(draggingId, targetId, placement)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', clearDragging, { once: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', clearDragging)
    }
  }, [draggingId, onReorder])

  return (
    <div className="drawer-layer">
      <div className="scrim" />
      <button className="drawer-close" onClick={onClose} aria-label="关闭">
        <X size={20} />
      </button>
      <aside className="drawer">
        <header className="drawer-head">游戏接入配置</header>
        <div className="drawer-body">
          <div className="notice">
            <Info size={16} />
            <div>
              <strong>配置提示：</strong>
              <p>更新后约 5 分钟同步线上展示，请谨慎操作。<br />申诉游戏仅生效于对应发行主体的账号申诉服务</p>
            </div>
          </div>
          <div className="list-title">
            <SectionTitle>申诉游戏列表</SectionTitle>
          </div>
          <div className="list-toolbar">
            <div className="issuer-select">{issuer}<ChevronDown size={14} /></div>
            <button className="primary-btn" onClick={onCreate}><Plus size={14} />接入其他游戏</button>
          </div>
          <div className="game-table-wrap">
            <table className="game-table">
              <thead>
                <tr>
                  <th>
                    <span className="order-head">
                      顺序
                      <span
                        className="order-tip"
                        tabIndex="0"
                        aria-label="此处排序将决定玩家申诉时，游戏选择列表的展示顺序。"
                      >
                        <Info size={12} />
                        <span className="order-tip-pop">此处排序将决定玩家申诉时，游戏选择列表的展示顺序。</span>
                      </span>
                    </span>
                  </th>
                  <th>游戏</th>
                  <th>appid</th>
                  <th>发行主体</th>
                  <th>最近更新时间</th>
                  <th>最近更新人</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game) => (
                  <tr
                    className={`${draggingId === game.id ? 'dragging-row' : ''} ${dragOverId === game.id ? 'drag-over-row' : ''}`}
                    data-game-id={game.id}
                    key={`${game.appid}-${game.id}`}
                  >
                    <td>
                      <button
                        className="drag-btn"
                        onPointerDown={(event) => {
                          event.preventDefault()
                          event.currentTarget.setPointerCapture?.(event.pointerId)
                          setDraggingId(game.id)
                        }}
                        title="按住拖拽调整排序"
                        aria-label={`拖拽排序 ${game.name}`}
                      >
                        <GripVertical size={16} />
                      </button>
                    </td>
                    <td><GameName game={game} /></td>
                    <td>{game.appid}</td>
                    <td>{issuer}</td>
                    <td>{game.updatedAt}</td>
                    <td>{game.updatedBy}</td>
                    <td className="actions">
                      <button onClick={() => onEdit(game)}>编辑</button>
                      <button className="danger-text" onClick={() => onDelete(game)}>删除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <footer className="drawer-foot">
          <button className="secondary-btn" onClick={onCancel}>取消</button>
          <button className="primary-btn" onClick={onSave}>保存</button>
        </footer>
      </aside>
    </div>
  )
}

function GameModal({ mode, game, configuredIds, onCancel, onSubmit }) {
  const isEdit = mode === 'edit'
  const defaultProject = isEdit ? game : null
  const [project, setProject] = useState(defaultProject)
  const [name, setName] = useState(isEdit ? game.name : '')
  const [logoPreview, setLogoPreview] = useState(isEdit ? game.icon : '')
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!project) {
      setError('请选择接入项目')
      return
    }
    if (!name.trim()) {
      setError('请输入游戏名称')
      return
    }
    if (!logoPreview) {
      setError('请上传游戏LOGO')
      return
    }
    onSubmit({ mode, project, name: name.trim(), logoPreview, original: game })
  }

  const handleFile = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setLogoPreview(URL.createObjectURL(file))
    setError('')
  }

  return (
    <div className="modal-layer">
      <div className="modal">
        <button className="modal-x" onClick={onCancel}><X size={16} /></button>
        <h2>{isEdit ? '编辑申诉游戏' : '接入其他游戏'}</h2>
        {!isEdit && <div className="modal-tip">如未找到所需项目，请联系SDK部门进行添加</div>}
        <div className="form-row">
          <label>项目选择 *</label>
          <div className={`select-control ${isEdit ? 'disabled' : ''} ${!project ? 'placeholder' : ''}`} onClick={() => !isEdit && setOpen((next) => !next)}>
            <span>{project?.name || '请选择接入项目'}</span>{project && <span>{project.appid}</span>}<ChevronDown size={14} />
          </div>
          {open && !isEdit && (
            <div className="select-menu">
              {projectOptions.map((option) => {
                const disabled = configuredIds.has(option.appid) && option.appid !== project?.appid
                return (
                  <button
                    className={disabled ? 'disabled' : option.appid === project?.appid ? 'selected' : ''}
                    key={option.appid}
                    disabled={disabled}
                    onClick={() => {
                      setProject(option)
                      setName(option.name)
                      setOpen(false)
                    }}
                  >
                    <span>{option.name}</span><span>{option.appid}</span>{disabled && <em>已接入</em>}
                  </button>
                )
              })}
            </div>
          )}
        </div>
        <div className="form-row">
          <label>游戏名称 *</label>
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className={`form-row logo-row ${open && !isEdit ? 'select-open' : ''}`}>
          <label>游戏LOGO *</label>
          <label className={`upload-box ${logoPreview ? 'has-image' : ''}`}>
            {logoPreview ? <img src={logoPreview} alt="" /> : <><Plus size={18} /><span>Upload</span></>}
            <input type="file" accept="image/png,image/jpeg" onChange={handleFile} />
          </label>
          <p>{isEdit ? '上传新 LOGO 后将覆盖当前展示 LOGO' : '请上传1:1比例的PNG或JPG图片，大小不超过2MB'}</p>
        </div>
        {error && <div className="form-error">{error}</div>}
        <div className="modal-foot">
          <button className="secondary-btn" onClick={onCancel}>取消</button>
          <button className="primary-btn" onClick={handleSubmit}>保存</button>
        </div>
      </div>
    </div>
  )
}

function ConfirmDialog({ title, body, primary, danger, onCancel, onConfirm }) {
  return (
    <div className="confirm-layer">
      <div className="confirm">
        <button className="modal-x" onClick={onCancel}><X size={16} /></button>
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="confirm-foot">
          <button className="secondary-btn" onClick={onCancel}>取消</button>
          <button className={danger ? 'danger-btn' : 'primary-btn'} onClick={onConfirm}>{primary}</button>
        </div>
      </div>
    </div>
  )
}

function GameName({ game }) {
  return (
    <span className="game-name">
      <img src={game.icon} alt="" />
      <span>{game.name}</span>
    </span>
  )
}

function SectionTitle({ children }) {
  return <h2 className="section-title">{children}</h2>
}

createRoot(document.getElementById('root')).render(<App />)
