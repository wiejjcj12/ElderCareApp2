import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Switch, FlatList, SafeAreaView } from 'react-native';

const COLORS = {
  primary: '#2E7D32',
  primaryLight: '#4CAF50',
  primaryDark: '#1B5E20',
  accent: '#FF6F00',
  bg: '#F5F5F5',
  card: '#FFFFFF',
  text: '#212121',
  textSec: '#757575',
  border: '#E0E0E0',
  danger: '#D32F2F',
  info: '#1565C0',
  warn: '#F57F17',
};

const FONT = { title: 28, big: 24, mid: 20, body: 18, small: 16 };

function IconButton({ emoji, label, onPress, color }) {
  return (
    <TouchableOpacity style={styles.iconBtn} onPress={onPress} activeOpacity={0.7}>
      <Text style={{ fontSize: 36 }}>{emoji}</Text>
      <Text style={{ fontSize: FONT.body, color: COLORS.text, marginTop: 6, textAlign: 'center' }}>{label}</Text>
    </TouchableOpacity>
  );
}

function Card({ title, children, icon }) {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        {icon ? <Text style={{ fontSize: 24, marginRight: 8 }}>{icon}</Text> : null}
        <Text style={{ fontSize: FONT.big, fontWeight: 'bold', color: COLORS.primary }}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

// ==================== HOME ====================
function HomeScreen({ onNavigate }) {
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth()+1}月${today.getDate()}日`;
  const weekDays = ['日','一','二','三','四','五','六'];
  const dayStr = `星期${weekDays[today.getDay()]}`;

  const tips = [
    '每天散步30分钟，有助于心血管健康',
    '饭后不宜立即剧烈运动，休息半小时最佳',
    '多喝水，每天至少8杯水',
    '保持心情愉快，笑一笑十年少',
    '定期测量血压，关注健康变化',
  ];
  const tip = tips[today.getDate() % tips.length];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.header}>
        <Text style={{ fontSize: FONT.title, fontWeight: 'bold', color: COLORS.primary }}>🏠 智慧生活</Text>
        <Text style={{ fontSize: FONT.body, color: COLORS.textSec, marginTop: 4 }}>{dateStr} {dayStr}</Text>
      </View>

      <Card title="今日小贴士" icon="💡">
        <Text style={{ fontSize: FONT.body, color: COLORS.text, lineHeight: 28 }}>{tip}</Text>
      </Card>

      <Text style={{ fontSize: FONT.big, fontWeight: 'bold', color: COLORS.text, marginVertical: 12 }}>快捷功能</Text>
      <View style={styles.grid}>
        <IconButton emoji="💊" label="用药提醒" onPress={() => onNavigate('health')} />
        <IconButton emoji="📊" label="健康记录" onPress={() => onNavigate('health')} />
        <IconButton emoji="📞" label="联系家人" onPress={() => onNavigate('social')} />
        <IconButton emoji="🌤️" label="天气预报" onPress={() => onNavigate('life')} />
        <IconButton emoji="📰" label="新闻资讯" onPress={() => onNavigate('life')} />
        <IconButton emoji="🆘" label="紧急电话" onPress={() => onNavigate('life')} />
      </View>

      <Card title="紧急求助" icon="🆘">
        <TouchableOpacity
          style={{ backgroundColor: COLORS.danger, padding: 16, borderRadius: 12, alignItems: 'center' }}
          onPress={() => Alert.alert('紧急呼叫', '正在拨打120急救电话...', [{ text: '取消' }, { text: '确定' }])}
        >
          <Text style={{ fontSize: FONT.big, color: '#FFF', fontWeight: 'bold' }}>📞 一键拨打 120</Text>
        </TouchableOpacity>
      </Card>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

// ==================== HEALTH ====================
function HealthScreen() {
  const [medicines, setMedicines] = useState([
    { id: '1', name: '降压药', time: '08:00', taken: false },
    { id: '2', name: '钙片', time: '12:00', taken: true },
    { id: '3', name: '维生素D', time: '20:00', taken: false },
  ]);
  const [bpSys, setBpSys] = useState('');
  const [bpDia, setBpDia] = useState('');
  const [sugar, setSugar] = useState('');
  const [records, setRecords] = useState([
    { id: '1', type: '血压', value: '130/85', date: '05-19' },
    { id: '2', type: '血糖', value: '5.8', date: '05-19' },
    { id: '3', type: '血压', value: '128/82', date: '05-18' },
  ]);

  const toggleMedicine = (id) => {
    setMedicines(medicines.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
  };

  const addRecord = () => {
    if (bpSys && bpDia) {
      setRecords([{ id: Date.now().toString(), type: '血压', value: `${bpSys}/${bpDia}`, date: '05-20' }, ...records]);
      setBpSys(''); setBpDia('');
    }
    if (sugar) {
      setRecords([{ id: (Date.now()+1).toString(), type: '血糖', value: sugar, date: '05-20' }, ...records]);
      setSugar('');
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: FONT.title, fontWeight: 'bold', color: COLORS.primary, marginBottom: 12 }}>💊 健康管理</Text>

      <Card title="用药提醒" icon="💊">
        {medicines.map(m => (
          <View key={m.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border }}>
            <View>
              <Text style={{ fontSize: FONT.body, fontWeight: '600', color: m.taken ? COLORS.textSec : COLORS.text, textDecorationLine: m.taken ? 'line-through' : 'none' }}>{m.name}</Text>
              <Text style={{ fontSize: FONT.small, color: COLORS.textSec }}>⏰ {m.time}</Text>
            </View>
            <Switch value={m.taken} onValueChange={() => toggleMedicine(m.id)} trackColor={{ false: COLORS.border, true: COLORS.primaryLight }} thumbColor="#FFF" />
          </View>
        ))}
      </Card>

      <Card title="记录健康数据" icon="📝">
        <Text style={{ fontSize: FONT.body, color: COLORS.textSec, marginBottom: 6 }}>血压 (mmHg)</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
          <TextInput style={styles.input} placeholder="收缩压" value={bpSys} onChangeText={setBpSys} keyboardType="numeric" />
          <Text style={{ fontSize: FONT.big, color: COLORS.textSec, alignSelf: 'center' }}>/</Text>
          <TextInput style={styles.input} placeholder="舒张压" value={bpDia} onChangeText={setBpDia} keyboardType="numeric" />
        </View>
        <Text style={{ fontSize: FONT.body, color: COLORS.textSec, marginBottom: 6 }}>血糖 (mmol/L)</Text>
        <TextInput style={styles.input} placeholder="血糖值" value={sugar} onChangeText={setSugar} keyboardType="numeric" />
        <TouchableOpacity style={styles.btn} onPress={addRecord}>
          <Text style={{ fontSize: FONT.body, color: '#FFF', fontWeight: 'bold' }}>💾 保存记录</Text>
        </TouchableOpacity>
      </Card>

      <Card title="历史记录" icon="📊">
        {records.map(r => (
          <View key={r.id} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.border }}>
            <Text style={{ fontSize: FONT.body, color: COLORS.text }}>{r.type}</Text>
            <Text style={{ fontSize: FONT.body, fontWeight: '600', color: COLORS.primary }}>{r.value}</Text>
            <Text style={{ fontSize: FONT.small, color: COLORS.textSec }}>{r.date}</Text>
          </View>
        ))}
      </Card>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

// ==================== SOCIAL ====================
function SocialScreen() {
  const contacts = [
    { id: '1', name: '儿子', phone: '138****1234', emoji: '👨' },
    { id: '2', name: '女儿', phone: '139****5678', emoji: '👩' },
    { id: '3', name: '老伴', phone: '137****9012', emoji: '💑' },
    { id: '4', name: '老友张哥', phone: '135****3456', emoji: '🤝' },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: FONT.title, fontWeight: 'bold', color: COLORS.primary, marginBottom: 12 }}>📞 亲友联系</Text>

      <Card title="一键拨号" icon="📞">
        {contacts.map(c => (
          <TouchableOpacity key={c.id} style={styles.contactRow} onPress={() => Alert.alert('拨号', `正在拨打 ${c.name} (${c.phone})`)}>
            <Text style={{ fontSize: 32, marginRight: 12 }}>{c.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: FONT.body, fontWeight: '600', color: COLORS.text }}>{c.name}</Text>
              <Text style={{ fontSize: FONT.small, color: COLORS.textSec }}>{c.phone}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity style={styles.smallBtn} onPress={() => Alert.alert('拨号', `拨打 ${c.name}`)}>
                <Text style={{ fontSize: FONT.body }}>📞</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.smallBtn} onPress={() => Alert.alert('视频', `视频通话 ${c.name}`)}>
                <Text style={{ fontSize: FONT.body }}>📹</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </Card>

      <Card title="照片分享" icon="📸">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {['🌸 花园', '🍲 家常菜', '🌅 夕阳', '🎂 生日', '🐕 小狗', '👨‍👩‍👧‍👦 全家福'].map((item, i) => (
            <View key={i} style={{ width: '47%', backgroundColor: COLORS.bg, borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 4 }}>
              <Text style={{ fontSize: 40 }}>{item.split(' ')[0]}</Text>
              <Text style={{ fontSize: FONT.body, color: COLORS.text, marginTop: 4 }}>{item.split(' ')[1]}</Text>
            </View>
          ))}
        </View>
      </Card>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

// ==================== LIFE SERVICE ====================
function LifeServiceScreen() {
  const news = [
    { id: '1', title: '国家出台养老新政策，惠及亿万老人', source: '人民日报', time: '2小时前' },
    { id: '2', title: '春季养生指南：这几个习惯要坚持', source: '健康时报', time: '3小时前' },
    { id: '3', title: '社区活动中心下周开放报名', source: '本地新闻', time: '5小时前' },
    { id: '4', title: '医保报销比例再提高5%', source: '新华社', time: '昨天' },
  ];

  const emergencyNums = [
    { name: '急救', num: '120', emoji: '🚑' },
    { name: '报警', num: '110', emoji: '👮' },
    { name: '火警', num: '119', emoji: '🚒' },
    { name: '社区服务', num: '12345', emoji: '🏢' },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: FONT.title, fontWeight: 'bold', color: COLORS.primary, marginBottom: 12 }}>🌤️ 生活服务</Text>

      <Card title="今日天气" icon="🌤️">
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 48 }}>☀️</Text>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: COLORS.text }}>24°C</Text>
            <Text style={{ fontSize: FONT.body, color: COLORS.textSec }}>晴</Text>
          </View>
          <View>
            <Text style={{ fontSize: FONT.body, color: COLORS.textSec }}>🌡️ 最高 28°C / 最低 16°C</Text>
            <Text style={{ fontSize: FONT.body, color: COLORS.textSec }}>💨 微风 2级</Text>
            <Text style={{ fontSize: FONT.body, color: COLORS.textSec }}>💧 湿度 45%</Text>
            <Text style={{ fontSize: FONT.body, color: COLORS.primary }}>✅ 适合户外散步</Text>
          </View>
        </View>
      </Card>

      <Card title="新闻资讯" icon="📰">
        {news.map(n => (
          <TouchableOpacity key={n.id} style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border }}>
            <Text style={{ fontSize: FONT.body, color: COLORS.text, fontWeight: '500' }}>{n.title}</Text>
            <Text style={{ fontSize: FONT.small, color: COLORS.textSec, marginTop: 4 }}>{n.source} · {n.time}</Text>
          </TouchableOpacity>
        ))}
      </Card>

      <Card title="紧急电话" icon="🆘">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {emergencyNums.map(e => (
            <TouchableOpacity key={e.num} style={styles.emergencyBtn} onPress={() => Alert.alert('拨号', `拨打 ${e.name} (${e.num})`)}>
              <Text style={{ fontSize: 28 }}>{e.emoji}</Text>
              <Text style={{ fontSize: FONT.body, fontWeight: 'bold', color: COLORS.danger }}>{e.num}</Text>
              <Text style={{ fontSize: FONT.small, color: COLORS.textSec }}>{e.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

// ==================== PROFILE ====================
function ProfileScreen() {
  const [fontSize, setFontSize] = useState('大');
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: FONT.title, fontWeight: 'bold', color: COLORS.primary, marginBottom: 12 }}>⚙️ 我的</Text>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Text style={{ fontSize: 56 }}>👴</Text>
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: FONT.big, fontWeight: 'bold', color: COLORS.text }}>张大伯</Text>
            <Text style={{ fontSize: FONT.body, color: COLORS.textSec }}>138****1234</Text>
          </View>
        </View>
      </View>

      <Card title="字体大小" icon="🔤">
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {['中', '大', '特大'].map(s => (
            <TouchableOpacity key={s} style={[styles.fontBtn, fontSize === s && { backgroundColor: COLORS.primary }]} onPress={() => setFontSize(s)}>
              <Text style={{ fontSize: s === '特大' ? 24 : s === '大' ? 20 : 16, color: fontSize === s ? '#FFF' : COLORS.text, fontWeight: 'bold' }}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      <Card title="设置" icon="⚙️">
        {[
          { icon: '🔔', label: '消息提醒', desc: '用药、天气、新闻推送' },
          { icon: '🔒', label: '隐私安全', desc: '密码、指纹解锁' },
          { icon: '💾', label: '数据备份', desc: '健康数据云端保存' },
          { icon: '❓', label: '使用帮助', desc: '操作指南、常见问题' },
          { icon: '💬', label: '意见反馈', desc: '告诉我们您的建议' },
          { icon: 'ℹ️', label: '关于我们', desc: '版本 1.0.0' },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border }}>
            <Text style={{ fontSize: 24, marginRight: 12 }}>{item.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: FONT.body, color: COLORS.text }}>{item.label}</Text>
              <Text style={{ fontSize: FONT.small, color: COLORS.textSec }}>{item.desc}</Text>
            </View>
            <Text style={{ fontSize: FONT.body, color: COLORS.textSec }}>›</Text>
          </TouchableOpacity>
        ))}
      </Card>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

// ==================== MAIN APP ====================
const TABS = [
  { key: 'home', label: '首页', emoji: '🏠' },
  { key: 'health', label: '健康', emoji: '💊' },
  { key: 'social', label: '亲友', emoji: '📞' },
  { key: 'life', label: '服务', emoji: '🌤️' },
  { key: 'profile', label: '我的', emoji: '⚙️' },
];

export default function App() {
  const [tab, setTab] = useState('home');

  const renderScreen = () => {
    switch (tab) {
      case 'home': return <HomeScreen onNavigate={setTab} />;
      case 'health': return <HealthScreen />;
      case 'social': return <SocialScreen />;
      case 'life': return <LifeServiceScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen onNavigate={setTab} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={{ flex: 1 }}>{renderScreen()}</View>
      <View style={styles.tabBar}>
        {TABS.map(t => (
          <TouchableOpacity key={t.key} style={[styles.tab, tab === t.key && styles.tabActive]} onPress={() => setTab(t.key)}>
            <Text style={{ fontSize: 24, opacity: tab === t.key ? 1 : 0.5 }}>{t.emoji}</Text>
            <Text style={{ fontSize: FONT.small, color: tab === t.key ? COLORS.primary : COLORS.textSec, fontWeight: tab === t.key ? 'bold' : 'normal' }}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  screen: { flex: 1, backgroundColor: COLORS.bg },
  header: { marginBottom: 12 },
  card: { backgroundColor: COLORS.card, borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 3 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  iconBtn: { width: '31%', backgroundColor: COLORS.card, borderRadius: 16, padding: 16, alignItems: 'center', marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 2, elevation: 2 },
  input: { flex: 1, backgroundColor: COLORS.bg, borderRadius: 10, padding: 12, fontSize: FONT.body, borderWidth: 1, borderColor: COLORS.border },
  btn: { backgroundColor: COLORS.primary, borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 12 },
  contactRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  smallBtn: { backgroundColor: COLORS.bg, borderRadius: 10, padding: 8 },
  emergencyBtn: { width: '47%', backgroundColor: '#FFF3F3', borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: '#FFCDD2' },
  fontBtn: { flex: 1, backgroundColor: COLORS.bg, borderRadius: 10, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  tabBar: { flexDirection: 'row', backgroundColor: COLORS.card, borderTopWidth: 1, borderTopColor: COLORS.border, paddingBottom: 4, paddingTop: 4 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 6 },
  tabActive: { borderTopWidth: 2, borderTopColor: COLORS.primary },
});
