import { CommunicationAnalysis } from '@/types/practice';
import { ToneEmotionCard } from './ToneEmotionCard';
import { ClarityMeter } from './ClarityMeter';
import { MisinterpretationsList } from './MisinterpretationsList';
import { MessageComparison } from './MessageComparison';
import { CommunicationTip } from './CommunicationTip';
import { FeedbackWidget } from './FeedbackWidget';
import { motion, Variants } from 'framer-motion';

interface AnalysisResultsProps {
  analysis: CommunicationAnalysis;
  originalMessage: string;
}

export function AnalysisResults({ analysis, originalMessage }: AnalysisResultsProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Analysis Results</h3>
        <ToneEmotionCard 
          tone={analysis.detected_tone} 
          emotion={analysis.detected_emotion} 
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ClarityMeter 
          score={analysis.clarity_score} 
          isSociallyAppropriate={analysis.is_socially_appropriate} 
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <MisinterpretationsList items={analysis.potential_misinterpretations} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Suggested Improvement</h3>
        <MessageComparison
          original={originalMessage}
          suggested={analysis.suggested_rewrite}
          explanation={analysis.improvement_explanation}
        />
      </motion.div>

      {analysis.communication_tip && (
        <motion.div variants={itemVariants}>
          <CommunicationTip tip={analysis.communication_tip} />
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <FeedbackWidget sessionId={analysis.session_id} />
      </motion.div>
    </motion.div>
  );
}
